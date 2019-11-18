import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);


export const store = new Vuex.Store({
  state:{
      teaName:'',
      teaNumber:''
  },
  mutations: {
    login (state,res) {
      state.teaName = res[0].teaName
      state.teaNumber = res[0].teaNumber
    }
  }

})
