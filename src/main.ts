import 'vuetify/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import { router } from './router'
import '@/styles/reset.scss'
import '@/styles/editor.scss'
import AntdCom from '@/plugins/antd-vue'


const pinia = createPinia()


const app = createApp(App)
app.use(pinia)
app.use(AntdCom)
app.use(router)



app.mount('#app');