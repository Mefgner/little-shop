import type { Component } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import CataloguePage from '@/pages/CataloguePage.vue'
import StartPage from '@/pages/StartPage.vue'
import ItemPage from '@/pages/ItemPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'

const routes: { path: string; component: Component }[] = [
  {
    path: '/',
    component: CataloguePage,
  },
  {
    path: '/product',
    component: ItemPage,
  },
  {
    path: '/about',
    component: StartPage,
  },
  {
    path: '/checkout',
    component: CheckoutPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
