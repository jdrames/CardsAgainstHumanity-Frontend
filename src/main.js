import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import sites from './sites';
import axios from 'axios';
import gamehub from './plugins/gamehub';

// Config axios and inject into vue instance
axios.defaults.baseURL = Vue.config.devtools ? sites.Development : sites.Production;
axios.defaults.withCredentials = false;
// Setup axios to insert the JWT token if its available from store
axios.interceptors.request.use(request=>{
  if(store.state.token) request.headers['Authorization'] = `Bearer ${store.state.token}`
  return request;
});
Vue.prototype.$axios = axios;
Vue.prototype.$mode = Vue.config.devtools ? 'dev' : 'prod';

// Use the gamehub plugin for SignalR
Vue.use(gamehub);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
