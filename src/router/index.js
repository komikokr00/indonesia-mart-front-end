import Vue from 'vue'
import Router from 'vue-router'
import frontPage from '@/components/frontPage/frontPage'
import loginPage from '@/components/loginPage/loginPage'
import barangPage from '@/components/barangPage/barangPage'
import kategoriPage from '@/components/barangPage/kategoriPage'
import kemasanPage from '@/components/barangPage/kemasanPage'
import naviPage from '@/components/barangPage/naviPage'
import beliPage from '@/components/beliPage/beliPage'
import orderPage from '@/components/beliPage/orderPage'
import adminPage from '@/components/adminPage/adminPage'
import kirimPage from '@/components/barangPage/kirimPage'

import { store } from '../store/store'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'frontPage',
      component: frontPage
    },
    {
      path: '/utama',
      name: 'utama',
      component: frontPage
    },
    {
      path: '/beli',
      name: 'beliPage',
      component: beliPage,
      meta: {
        requiresBarangsBeli: true
      }
    },
    {
      path: '/bahaya',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/barang',
      name: 'barangPage',
      component: barangPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/kategori',
      name: 'kategoriPage',
      component: kategoriPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/kemasan',
      name: 'kemasanPage',
      component: kemasanPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/navibahaya',
      name: 'naviPage',
      component: naviPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dataadmin',
      name: 'adminPage',
      component: adminPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/order',
      name: 'orderPage',
      component: orderPage,
      props: (route) => ({
        orderId: route.query.id
      })
    },
    {
      path: '/kirim',
      name: 'kirimPage',
      component: kirimPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  var loggedIn = store.getters.isAdmin
  var requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !loggedIn) next('utama')
  else next()
})

export default router
