import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    name: localStorage.getItem("name") ? localStorage.getItem("name") : null
  },
  mutations: {
    setName(state, name){
      state.name = name;      
    },
    setToken(state, token){
      state.token = token;      
    }
  },
  actions: {
    doLogin(context, payload){
      context.commit("setName", payload.name);
      localStorage.setItem("name", payload.name);

      context.commit("setToken", payload.token);
      localStorage.setItem("token", payload.token);
    },
    doLogout(context){
      context.commit("setName", null);
      context.commit("setToken", null);
      localStorage.clear();      
    }
  },
  modules: {
  }
})
