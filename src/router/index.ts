import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/regist',
    alias: '/regist',
    component: () => import('@/views/regist.vue')
  },
  {
    path: '/',
    component: () => import('@/views/Editor.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
