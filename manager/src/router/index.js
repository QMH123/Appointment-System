import Vue from 'vue'
import Router from 'vue-router'
import changeInf from "../components/changeInf";
import history from "../components/history";
import pubAct from "../components/pubact";
import index from "../components/index";
import login from "../components/login";
import moreInf from "../components/moreInf";
import pubchange from "../components/pubchange";

Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path:'/login',
      name:'login',
      component: login
    },
    {
      path:'/index',
      name:'index',
      component:index,
      children:[
        {
          path: '/',
          redirect: '/pubAct'
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
          component: history,
        },
        {
          path: '/moreInf',
          name : 'moreInfLink',
          component: moreInf
        },
        {
          path: '/pubchange',
          name : 'pubchangeLink',
          component: pubchange
        }
      ]
    },

    {
      path: '*',
      name : "404NotFound",
      component: pubAct,
      redirect:'/login'
    }
  ]
})
