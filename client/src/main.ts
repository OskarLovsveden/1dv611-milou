import { createApp } from 'vue'
import Toaster from '@meforma/vue-toaster';

import App from './App.vue'
import store from './store'

createApp(App)
    .use(store)
    .use(Toaster, {
        position: "top-right"
    })
    .mount('#app')