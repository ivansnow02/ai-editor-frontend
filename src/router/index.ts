import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/regist',
        alias: '/regist',
        component: () => import("@/views/regist.vue")
    }

]
const router = createRouter({
    history: createWebHashHistory(),
    routes

})

export default router