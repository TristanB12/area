import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import store from '../store/index.js';

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
    path: '/mobile',
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
    path: '/redirect/:service',
    name: 'RedirectPage',
    component: () => import(/* webpackChunkName: "redirect" */ '../views/RedirectPage.vue'),
  },
  {
    path: '/app',
    name: 'AppPage',
    component: () => import(/* webpackChunkName: "AppPage" */ '../views/AppPage.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'add-area',
        name: 'AddAreaPage',
        component: () => import(/* webpackChunkName: "AddAreaPage" */ '../views/AddAreaPage.vue')
      },
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

router.beforeEach(async (to,from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      next({name: 'LoginPage'})
    }
    else {
      next()
    }
  }
  else {
    next()
  }
})

export default router
