// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import request from './request'
import axios from 'axios'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import {store} from './store/store';

Vue.prototype.$request = request
Vue.use(ViewUI);
Vue.use(axios);




// router.beforeEach((to, from, next) => {
//     // if (store.state.teaName !== ""){
//     //   next();
//     // }
//     // else
//     // {
//     //   alert("请先登录!");
//       // next("/login");
//     // }
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  axios,
  components: { App },
  template: '<App/>'
})
