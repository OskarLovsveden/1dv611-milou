import { createApp } from 'vue'
import Toaster from '@meforma/vue-toaster';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faEdit);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from './App.vue'
import store from './store'

createApp(App)
    .use(store)
    .use(Toaster, {
        position: "top-right"
    })
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')