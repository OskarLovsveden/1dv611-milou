import App from './App.vue'
import router from './router'

import { createApp } from 'vue'

// import Vuex from 'vuex'

// const store = new Vuex.Store({
//     state () {
//         return {
//             count: 0
//         }
//     },
//     mutations: {
//         increment (state: any) {
//             state.count++
//         }
//     }
// })

const app = createApp(App)

// app.use(store)
app.use(router)

app.mount('#app')
