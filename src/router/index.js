import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store';
import welcome from './modules/welcome.routes';
import system from './modules/system.routes';
import account from './modules/account.routes';
import authority from './modules/authority.routes';
import users from './modules/users.routes';
import products from './modules/products.routes';
import risk from './modules/risk.routes';
import finance from './modules/finance.routes';
import operate from './modules/operates.routes';

Vue.use(Router);

const mainRoutes = [
  welcome,
  system,
  authority,
  users,
  products,
  risk,
  finance,
  operate
]

const routes = [{
    path: '/',
    name: 'index',
    component: () =>
      import ('@/pages/components/public.vue'),
    children: [account],
    redirect: {
      name: 'LoginPage'
    }
  },
  {
    path: '/mijin',
    name: 'mijin',
    component: () =>
      import ('@/pages/components/main.vue'),
    children: mainRoutes,
    redirect: {
      name: 'Welcome'
    }
  },
  {
    path: '*',
    redirect: {
      name: 'Welcome'
    }
  },
];
store.dispatch('saveRoute', mainRoutes);

const router = new Router({
  mode: 'history',
  routes: routes
});

// 路由拦截
router.beforeEach((to, from, next) => {
  // 获取登陆token
  let token = window.localStorage['token'];
  if (!token) {
    if (to.name == "LoginPage" || to.name == "ResetPage") {
      next()
    } else {
      next({
        name: "LoginPage"
      })
    }
  } else {
    if (window.localStorage['routes'] && to.name != 'ResetPage') {
      let auth = window.localStorage['routes'].indexOf(to.name);
      if (to.name == 'WelcomeAll') {
        next();
      } else if (auth == -1 && to.name != 'WelcomeAll') {
        next({
          name: "Welcome"
        });
      } else {
        next();
      }
    } else {
      if (to.name == "LoginPage") {
        next({
          name: "Welcome"
        });
      } else {
        next();
      }
    }
  }
  store.commit('clearParams');
})

export default router
