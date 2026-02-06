import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/views/HomeView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'İkinci El Araç İlanları | Adverts Listing',
    },
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/DetailView.vue'),
    props: true,
    meta: {
      title: 'İlan Detayı | Adverts Listing',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
