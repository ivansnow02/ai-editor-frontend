import { createRouter, createWebHashHistory,createMemoryHistory } from "vue-router";

const routes = [
    {
        path:'/',
        component: () => import ("@/views/home.vue")
    },{
        path:'/editor',
        component: () => import("@/views/mainEditor.vue")
    }
]
const router = createRouter({
    history: createMemoryHistory(),
    routes

})

export default router