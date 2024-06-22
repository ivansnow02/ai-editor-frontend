import 'vuetify/styles';

import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue';
import { vuetifyProTipTap } from './tiptap';
import '@mdi/font/css/materialdesignicons.css'
import {router} from './router';

const vuetify = createVuetify({
  components,
  directives,

})

const app = createApp(App);
app.use(vuetify);
app.use(vuetifyProTipTap);
app.use(router);
// app.use(ElementPlus)


app.mount('#app');