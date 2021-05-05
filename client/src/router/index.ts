import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [ 
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/profile',
  //   name: 'Profile',
  //   component: Profile,
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   const authenticatedUser = true;
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   // Check for protected route
//   if (requiresAuth && !authenticatedUser) {
//     next('');
//   } else {
//     next();
//   }
// });

export default router
