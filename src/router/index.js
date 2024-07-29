import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import MineView from '../views/MineView.vue'
import ShopView from '../views/ShopView.vue'
import RatingView from '../views/RatingView.vue'


const routes = [
    {
        path: '/',
        name: 'start',
        component: StartView,
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: { requiresAuth: true }
    },
    {
        path: '/mine',
        name: 'mine',
        component: MineView,
        meta: { requiresAuth: true }
    },
    {
        path: '/shop',
        name: 'shop',
        component: ShopView,
        meta: { requiresAuth: true }
    },
    {
        path: '/rating',
        name: 'rating',
        component: RatingView,
        meta: { requiresAuth: true }
    },
  
 

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isLoggedIn()) { next('/login'); }
//   else { next(); }
// })

// function isLoggedIn() {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return false;
//   }

//   try {
//     // Декодируем JWT-токен, чтобы проверить его срок действия
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const now = Date.now().valueOf() / 1000;

//     // Проверяем, не истек ли срок действия токена
//     if (typeof payload.exp !== 'undefined' && payload.exp < now) {
//       return false;
//     }

//     return true;
//   } catch (error) {
//     // В случае ошибки декодирования считаем, что пользователь не авторизован
//     return false;
//   }
// }

