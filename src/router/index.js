import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Profile from '@/components/user/profile'
import Signup from '@/components/user/signup'
import Login from '@/components/user/login'
import App from '../App.vue'
import authGuard from './auth-guard'

Vue.use(VueRouter)


export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: authGuard
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/',
      name: 'App',
      component: App
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
      // beforeEnter: authGuard ????
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
