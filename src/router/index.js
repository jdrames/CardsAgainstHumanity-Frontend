import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/getstarted',
    name: 'Get-Started',
    component: () => import(/* webpackChunkName: "getstarted" */ '../views/Getstarted.vue')    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/** Basic router guard */
router.beforeEach((to, from, next)=>{
  // check if the page requires auth
  if(to.meta?.requiresAuth == true){
    if(!Store.state.token){
      next({path: '/', replace: true});
    }
  }
  // if not just load the next page
  next();
});

export default router
