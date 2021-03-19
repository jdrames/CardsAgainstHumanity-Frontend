import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    name: localStorage.getItem("name") ? localStorage.getItem("name") : null,
    id: localStorage.getItem("id") ? localStorage.getItem("id") : null
  },
  mutations: {
    setUser(state, payload){
      state.id = payload?.id;
      state.name = payload?.name;      
      state.token = payload?.token;
    },
  },
  actions: {
    doLogin(context, payload){
      context.commit("setUser", payload);
      localStorage.setItem("id", payload?.id);
      localStorage.setItem("name", payload?.name);      
      localStorage.setItem("token", payload?.token);
    },
    doLogout(context){
      context.commit("setUser", null);      
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("token");
    }
  },
  modules: {
  }
})
