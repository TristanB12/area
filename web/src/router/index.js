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
    path: '/register',
    name: 'RegisterPage',
    component: () => import(/* webpackChunkName: "RegisterPage" */ '../views/RegisterPage.vue')
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
  {
    path: '/app',
    name: 'AppPage',
    component: () => import(/* webpackChunkName: "AppPage" */ '../views/AppPage.vue'),
    children: [
      {
        path: 'areas',
        name: 'AreasPage',
        component: () => import(/* webpackChunkName: "AreasPage" */ '../views/AreasPage.vue')
      },
      {
        path: 'apps',
        name: 'AppsPage',
        component: () => import(/* webpackChunkName: "AppsPage" */ '../views/AppsPage.vue')
      },
      {
        path: 'explore',
        name: 'ExplorePage',
        component: () => import(/* webpackChunkName: "ExplorePage" */ '../views/ExplorePage.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
