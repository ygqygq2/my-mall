import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/Home.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import('../views/cartList/CartList.vue')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import('../views/orderConfirmation/OrderConfirmation.vue')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import('../views/orderList/OrderList.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('../views/mine/Mine.vue')
  },
  {
    path: '/mine/newAddress',
    name: 'NewAddress',
    component: () => import('../views/mine/NewAddress.vue')
  },
  {
    path: '/mine/editAddress/:id',
    name: 'EditAddress',
    component: () => import('../views/mine/EditAddress.vue')
  },
  {
    path: '/mine/manageAddress',
    name: 'ManageAddress',
    component: () => import('../views/mine/ManageAddress.vue')
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('../views/shop/Shop.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  const { name } = to;
  const isLoginOrRegister = (name === "Login" || name === "Register");
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'Login' });
})

export default router
