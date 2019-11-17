// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './request'
import axios from 'axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.prototype.$request = request
Vue.use(ViewUI);
Vue.use(axios)

// router.beforeEach((to, from, next) => {
//     if (to.path !== '/login'){
//       alert("秦墨涵！");
//       next('/login');
//     }
//     else{
//       next();
//     }
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
