import { createRouter, createMemoryHistory, createWebHistory } from "vue-router";
import home from "@/views/Home.vue";
import editor from "@/views/Editor.vue"
import { getToken } from "@/utils/token";
const routes = [
  {
    path: '/login',
    component: home
  },
  {
    path: '/',
    meta: {
      requireAuth: true
    },
    component: editor
  }
]
export  const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !getToken()) {
    next('/login')
  } else {
    next()
  }
}
)
