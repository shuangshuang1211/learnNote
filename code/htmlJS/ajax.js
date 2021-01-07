function createXHR(){
    if(typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined"){
        if(typeof arguments.callee.activeXString != "string"){
            var version = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
            for (var i=0,len= version.lenngth;i<len;i++){
                try{
                    new ActiveXObject(version[i]);
                    arguments.callee.activeXString = version[i];
                    break;
                }
                catch(ex){}
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
        
    }else{
        throw new Error("no XHR object")
    }
}

function serialize(form){
    var parts = [];
    var field =null;
    for (var i=0, len=form.elements.length;i<len;i++){
         field = form.elements[i];
        switch(field.type){
            case "select-one":
            case "select-mutiple":
                for (var j=0,optlen=field.options.length;j<optlen;j++){
                    var option = field.options[j];
                    if(option.selected){
                        var optValue = "";
                        if(option.hasAttribute){
                            optValue = (option.hasAttribute("value") ? option.value : option.text);
                        }
                        else{
                            optValue = (option.attributes["value"].specified ? option.value : option.text);
                        }
                        parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue));
                    }
                }
                break;
            case undefined:
            case "file":
            case "submit":
            case "reset":
            case "button":
                break;
            case "radio":
            case "checkbox":
                if(!field.checked){
                    break;
                }
            default:
                parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(field.value));
        }
    }
    return parts.join("&");
}

function submitData(){
    var xhr = createXHR();
    xhr.onreadystatechange = function (event){
    if (xhr.readyState == 4){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            alert(xhr.statusText);
//            alert(xhr.responseText);
        }
        else{
            alert("请求失败：" + xhr.status);
        }
    }
};   //添加异步读取数据的onreadystatechange事件；
xhr.open("post","myexp.html",true);  //chrome 不能请求；但mics edge可以,false 代表同步，true异步；
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
var form0 = document.getElementById("user-info");
xhr.send(serialize(form0));
}

function creatImgCors(){
    var img = new Image();
    img.onerror = function(){
        alert("未获取资源!");
    };
    img.onload = function (){
        alert("资源获取成功")
    }
    img.src = "http://www.baidu.com";
}
