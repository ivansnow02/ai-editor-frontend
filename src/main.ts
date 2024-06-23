import 'vuetify/styles'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import '@/styles/reset.scss'
import '@/styles/editor.scss'
import AntdCom from '@/plugins/antd-vue'
//
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.use(vuetify)
app.use(pinia)
app.use(AntdCom)
app.use(router)
// app.use(ElementPlus)

app.mount('#app')
