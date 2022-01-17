// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
//simport 'jquery'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 

import './style/bootstrap3.3.7.css'
import './style/index/metisMenu.min.css'
import './style/sb-admin-2.css'
import './style/font-awesome.min.css'
import './style/earthquake/lanrenzhijia.css'


import './js/metisMenu.min.js'
import './js/raphael.min.js'
import './js/sb-admin-2.js'
import './js/jquery.min.js'

Vue.use(ElementUI)
//Vue.use(VueResource)
Vue.prototype.$http = axios
           

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
