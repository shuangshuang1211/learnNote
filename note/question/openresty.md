openresty：用的nginx+lua做了一层反向代理

openresty 统一对外的端口是 80 和8080。然后根据请求的 url （/api/XXXX）把请求转到不同的后端组件，比如 core 是 10.20.30.101:8989，biservice 是 10.20.30.101:8086。当然在转发之前，会根据 cookie 获取 session，然后修改 request header，加上 auth 信息

部署： 手动部署 + anisible（redhat开源的IT自动化工具）

```.conf
# The main configuration for openresty

worker_processes auto;
pid ./eaas-openresty.pid;

events {
  multi_accept on;
}

http {
  include mime.types;

  upstream eaas_core {
    server 127.0.0.1:8989;
    keepalive 32;
  }

  upstream msgbus {
    server 127.0.0.1:18082;
  }

  upstream authctrl {
    server 127.0.0.1:8082;
    keepalive 128;
  }

  upstream eaas_file {
    server 127.0.0.1:9080;
    keepalive 32;
  }

  upstream imagectrl {
    server 127.0.0.1:9081;
    keepalive 32;
  }

  upstream biservice {
    server 127.0.0.1:8086;
    keepalive 32;
  }

  upstream metabase {
    server 127.0.0.1:8010;
    keepalive 32;
  }

  upstream grafana {
    server 127.0.0.1:3300;
    keepalive 32;
  }

  upstream hpcctrl {
    server 127.0.0.1:7891;
    keepalive 32;
  }

  access_log /dev/stdout;
  error_log  /dev/stdout debug;

  lua_package_path "/usr/local/openresty/nginx/lua/?.lua;;";

  map $http_upgrade $connection_upgrade {
    default upgrade;
    ''    close;
  }

  proxy_http_version 1.1;
  proxy_set_header Host $http_host;
  proxy_set_header Origin $http_origin;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection $connection_upgrade;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Host $http_host;
  proxy_set_header X-Forwarded-Proto $scheme;

  server_tokens off;

  # This is for the user portal
  server {
    set $lrucache_limit 1000;
    set $lrucache_ttl 7200;
    set $eaas_auth http://127.0.0.1:8082;
    set $eaas_core http://127.0.0.1:8989;

    listen *:80;
    server_name eaas.lianoid.com;

    root /var/html;
    index index.html;

    # Disable caching all html files
    location ~ .*\.(?:htm|html)$ {
      add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    location / {
      location ~^/[\w\d\/]*$ {
        # Disable caching index.html for eaas-ui(SPA)
        gzip on;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
        expires 0;
        root /var/html/user;
        try_files $uri $uri/index.html /;
      }
      gzip on;
      root /var/html/user;
      try_files $uri $uri/index.html /;
    }

    # For static user data, example: app icons or ui config file
    location /data {
      gzip on;
      root /web;
      try_files $uri /;
    }

    location /desktop {
      gzip on;
      try_files $uri $uri/index.html /;
    }

    location /help {
      gzip on;
      rewrite ^/help$ $scheme://$http_host/help/ permanent;
      try_files $uri $uri/index.html /;
    }

    location /auth {
      proxy_pass http://authctrl;
    }

    location /grafana {
      location ~* ^/grafana/(d-solo|api)/ {
        access_by_lua_block {require "auth".authUser()}
        proxy_set_header X-WEBAUTH-USER admin;
        proxy_pass http://grafana;
      }
      location /grafana/public {
        proxy_set_header X-WEBAUTH-USER admin;
        proxy_pass http://grafana;
      }
    }

    location /api {
      set $authed_id "";
      set $authed_uname "";
      set $display_name "";
      access_by_lua_block {require "auth".authUser()}
      location ~/api/storage/ {
        client_max_body_size 50m;
        proxy_buffering off;
        proxy_request_buffering off;
        proxy_http_version 1.1;
        proxy_set_header Host $http_host;
        proxy_set_header X-Authed-Id $authed_id;
        proxy_set_header X-Authed-Uname $authed_uname;
        proxy_set_header X-Display-Name $display_name;
        proxy_set_header X-Sys-Admin 0;
        # clear connection header because the default value is "close"
        # since http 1.1, we don't need to set it "Keep-Alive"
        proxy_set_header Connection "";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://eaas_file;
      }
      location ~/api/core/(.*) {
        set $authed_id "";
        set $authed_uname "";
        set $display_name "";
        access_by_lua_block {require "auth".authUser()}
        proxy_set_header X-Authed-Id $authed_id;
        proxy_set_header X-Authed-Uname $authed_uname;
        proxy_set_header X-Display-Name $display_name;
        proxy_set_header X-Sys-Admin 0;
        proxy_pass http://eaas_core/$1$is_args$args;
      }
      location ~/api/meter/ {
      	set $authed_id "";
      	set $authed_uname "";
        set $display_name "";
        access_by_lua_block {require "auth".authUser()}
        proxy_set_header X-Authed-Id $authed_id;
        proxy_set_header X-Authed-Uname $authed_uname;
        proxy_set_header X-Display-Name $display_name;
        proxy_set_header X-Sys-Admin 0;
        rewrite ^/api/meter/(.*) /meter/$1 break;
        proxy_pass http://biservice;
      }
      location ~/api/hpc/ {
        set $authed_id "";
        set $authed_uname "";
        set $display_name "";
        access_by_lua_block {require "auth".authUser()}
        proxy_connect_timeout 7d;
        proxy_send_timeout 7d;
        proxy_read_timeout 7d;
        proxy_set_header X-Authed-Id $authed_id;
        proxy_set_header X-Authed-Uname $authed_uname;
        proxy_set_header X-Display-Name $display_name;
        proxy_set_header X-Sys-Admin 0;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        rewrite ^/api/hpc/(.*) /$1 break;
        proxy_pass http://hpcctrl;
      }
    }

    location /socket.io {
      set $authed_id "";
      set $authed_uname "";
      set $display_name "";
      access_by_lua_block {require "auth".authUser()}
      proxy_connect_timeout 7d;
      proxy_send_timeout 7d;
      proxy_read_timeout 7d;
      proxy_redirect off;
      proxy_buffering off;
      proxy_http_version 1.1;
      proxy_set_header X-Authed-Id $authed_id;
      proxy_set_header X-Authed-Uname $authed_uname;
      proxy_set_header X-Display-Name $display_name;
      proxy_set_header X-Sys-Admin 0;
      proxy_set_header Host $http_host;
      proxy_set_header Origin $http_origin;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_pass http://msgbus;

      log_by_lua_block {
        print(string.format("user %s %s proxy to msgbus", ngx.var.display_name, ngx.var.authed_id))
      }
    }

    location /proxy {
      location ~/proxy/service/(?<service_id>([\w-]+))(?<service_path>(.*)) {
        set $authed_id "";
        set $authed_uname "";
        set $display_name "";
        set $service_url "";
        set $origin_uri $request_uri; # should not use $uri which will be decoded
        access_by_lua_block {
          require "auth".authUser()
          require "service".run()
        }
        client_max_body_size 8m;
        proxy_connect_timeout 1m;
        proxy_send_timeout 1m;
        proxy_read_timeout 1m;
        proxy_http_version 1.1;
        proxy_set_header X-Authed-Id $authed_id;
        proxy_set_header X-Authed-Uname $authed_uname;
        proxy_set_header X-Display-Name $display_name;
        proxy_set_header X-Sys-Admin 0;
        proxy_set_header Host $http_host;
        proxy_set_header Origin $http_origin;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass $service_url;

        log_by_lua_block {
          print("proxy to the service url ---> ", ngx.var.service_url)
        }
      }
    }
  }

  # This is for the admin portal
  server {
    set $lrucache_limit 1000;
    set $lrucache_ttl 7200;
    set $eaas_auth http://127.0.0.1:8082;

    listen *:8080;
    server_name eaas.lianoid.com;

    root /var/html;
    index index.html;

    # pass through headers from metabase which are considered invalid by Nginx server.
    ignore_invalid_headers off;

    # Disable caching all html files
    location ~ .*\.(?:htm|html)$ {
      add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    location / {
      location ~^/[\w\d\/]*$ {
        # Disable caching index.html for eaas-ui(SPA)
        gzip on;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
        expires 0;
        root /var/html/admin;
        try_files $uri $uri/index.html /;
      }
      gzip on;
      root /var/html/admin;
      try_files $uri $uri/index.html /;
    }

    # For static user data, example: app icons or ui config file
    location /data {
      gzip on;
      root /web;
      try_files $uri /;
    }

    # For admin to access user docs
    location /help {
      gzip on;
      rewrite ^/help$ $scheme://$http_host/help/ permanent;
      try_files $uri $uri/index.html /;
    }

    # For admin to access admin docs
    location /adminhelp {
      gzip on;
      rewrite ^/adminhelp$ $scheme://$http_host/adminhelp/ permanent;
      try_files $uri $uri/index.html /;
    }

    location /auth {
      location ~/auth/admin/logout {
        access_by_lua_block {require "auth".deleteCache()}
        proxy_pass http://authctrl;
      }
      proxy_pass http://authctrl;
    }

    location /grafana {
      location /grafana/public {
        proxy_set_header X-WEBAUTH-USER admin;
        proxy_pass http://grafana;
      }
      access_by_lua_block {require "auth".authAdmin()}
      proxy_set_header X-WEBAUTH-USER admin;
      proxy_pass http://grafana;
    }

    # all admin's X-Authed-Id is 0
    location /api {
      location ~/api/core/(.*) {
        set $authed_id "";
        access_by_lua_block {require "auth".authAdmin()}
        proxy_set_header X-Authed-Id 0;
        proxy_set_header X-Authed-AdminId $authed_id;
        proxy_set_header X-Sys-Admin 1;
        proxy_pass http://eaas_core/$1$is_args$args;
      }
      location ~/api/image {
      	set $authed_id "";
        access_by_lua_block {require "auth".authAdmin()}
        client_max_body_size 10m;
        proxy_buffering off;
        proxy_request_buffering off;
        proxy_http_version 1.1;
        proxy_set_header X-Authed-Id 0;
        proxy_set_header X-Authed-AdminId $authed_id;
        proxy_set_header X-Sys-Admin 1;
        proxy_set_header Connection keepalive;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://imagectrl;
      }
      location ~/api/meter/ {
      	set $authed_id "";
        access_by_lua_block {require "auth".authAdmin()}
        proxy_set_header X-Authed-Id 0;
        proxy_set_header X-Authed-AdminId $authed_id;
        proxy_set_header X-Sys-Admin 1;
        rewrite ^/api/meter/(.*) /meter/$1 break;
        proxy_pass http://biservice;
      }
      location ~/api/hpc/ {
        set $authed_id "";
        access_by_lua_block {require "auth".authAdmin()}
        proxy_set_header X-Authed-Id 0;
        proxy_set_header X-Authed-AdminId $authed_id;
        proxy_set_header X-Sys-Admin 1;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        rewrite ^/api/hpc/(.*) /$1 break;
        proxy_pass http://hpcctrl;
      }
    }

    # metabase
    location /mb/ {
      proxy_connect_timeout   2m;
      proxy_send_timeout      2m;
      proxy_read_timeout      2m;

      proxy_http_version 1.1;
      proxy_set_header Host $http_host;
      proxy_set_header Origin $http_origin;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

      # more_set_headers "X-Frame-Options: ALLOWALL";
      rewrite ^/mb/(.*) /$1 break;

      proxy_pass http://metabase;

      log_by_lua_block {
        print("dashboard: proxy to metabase, authed admin id is 1")
      }
    }

    location /socket.io {
      set $authed_id "";
      access_by_lua_block {require "auth".authAdmin()}
      proxy_connect_timeout 7d;
      proxy_send_timeout 7d;
      proxy_read_timeout 7d;
      proxy_redirect off;
      proxy_buffering off;
      proxy_http_version 1.1;
      proxy_set_header X-Authed-Id 0; # all admin's uid is 0
      proxy_set_header X-Authed-AdminId $authed_id;
      proxy_set_header X-Sys-Admin 1;
      proxy_set_header Host $http_host;
      proxy_set_header Origin $http_origin;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_pass http://msgbus;

      log_by_lua_block {
        print(string.format("admin %s proxy to msgbus", ngx.var.authed_id))
      }
    }
  }

  # This is for the dashboard portal
  server {
    listen *:8088;
    server_name eaas.lianoid.com;
    root /var/html;
    index index.html;
    # pass through headers from metabase which are considered invalid by Nginx server.
    ignore_invalid_headers off;

    # Disable caching all html files
    location ~ .*\.(?:htm|html)$ {
      add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    location / {
      location ~^/[\w\d\/]*$ {
        # Disable caching index.html
        gzip on;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
        expires 0;
        root /var/html/dashboard;
        try_files $uri $uri/index.html /;
      }
      gzip on;
      root /var/html/dashboard;
      try_files $uri $uri/index.html /;
    }

    location /data {
      gzip on;
      root /web;
      try_files $uri /;
    }

    # metabase
    location /mb/ {
      proxy_connect_timeout   2m;
      proxy_send_timeout      2m;
      proxy_read_timeout      2m;

      proxy_http_version 1.1;
      proxy_set_header Host $http_host;
      proxy_set_header Origin $http_origin;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

      # more_set_headers "X-Frame-Options: ALLOWALL";
      rewrite ^/mb/(.*) /$1 break;

      proxy_pass http://metabase;

      log_by_lua_block {
        print("dashboard: proxy to metabase, authed admin id is 1")
      }
    }

    location /socket.io {
      proxy_connect_timeout 7d;
      proxy_send_timeout 7d;
      proxy_read_timeout 7d;
      proxy_redirect off;
      proxy_buffering off;
      proxy_http_version 1.1;
      proxy_set_header X-Authed-Id 0;
      proxy_set_header X-Authed-AdminId 1;
      proxy_set_header X-Sys-Admin 1;
      proxy_set_header Host $http_host;
      proxy_set_header Origin $http_origin;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $connection_upgrade;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_pass http://msgbus;

      log_by_lua_block {
        print("dashboard: proxy to msgbus, authed admin id is 1")
      }
    }
  }
}
```

