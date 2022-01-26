import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "LoginPage" */ '../views/LoginPage.vue')
  },
  {
    path: '/login',
    name: 'MobilePage',
    component: () => import(/* webpackChunkName: "MobilePage" */ '../views/MobilePage.vue')
  },
  {
    path: '/about',
    name: 'AboutUsPage',
    component: () => import(/* webpackChunkName: "AboutUsPage" */ '../views/AboutUsPage.vue')
  },
  {
    path: '/services',
    name: 'ServicesPage',
    component: () => import(/* webpackChunkName: "ServicesPage" */ '../views/ServicesPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
