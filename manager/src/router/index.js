import Vue from 'vue'
import Router from 'vue-router'
import changeInf from "../components/changeInf";
import history from "../components/history";
import pubAct from "../components/pubact";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component: login
    },
    {
      path: '/pubAct',
      name: 'pubActLink',
      component: pubAct
    },
    {
      path: '/changeInf',
      name: 'changeInfLink',
      component: changeInf
    },
    {
      path: '/history',
      name : 'historyLink',
      component: history
    },
    {
      path: '*',
      name : "404NotFound",
      component: pubAct
    }
  ]
})
