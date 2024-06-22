import { createRouter, createWebHashHistory,createMemoryHistory } from "vue-router";
import home from "@/views/Home.vue";
import editor from "@/views/AIEditor.vue"
const routes = [
    {
        path:'/',
        component: home
    },{
        path:'/editor',
        component: editor
    }
]
export  const router = createRouter({
    history: createMemoryHistory(),
    routes

})

