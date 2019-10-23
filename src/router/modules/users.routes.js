export default {
  path: 'users',
  name: 'Users',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'UserList'},
  children: [
    {
      path: 'userslist',
      name: 'UserList',
      component: () => import('@/pages/users/users.vue'),
      meta: {
        title: '用户列表',
        auth: false,
        show: true
      }
    },
    {
      path: 'whitelist',
      name: 'WhiteList',
      component: () => import('@/pages/users/whiteList.vue'),
      meta: {
        title: '风控白名单',
        auth: false,
        show: true
      }
    },
    {
      path: 'detail/:id',
      name: 'UserDetail',
      component: () => import('@/pages/users/userDetail.vue'),
      meta: {
        title: '用户详情',
        auth: false,
        show: false
      }
    },
    {
      path: 'userLoanDetail/:id',
      name: 'UserLoanDetail',
      component: () => import('@/pages/users/userLoanDetail.vue'),
      meta: {
        title: '借款详情',
        auth: false,
        show: false
      }
    },
    {
      path: 'userLoanDetail/repay/:id',
      name: 'UserRepayList',
      component: () => import('@/pages/users/userDetail/userRepayList.vue'),
      meta: {
        title: '还款明细',
        auth: false,
        show: false
      }
    }
  ],
  meta: {
    title: '用户管理',
    auth: false,
    show: true
  }
}
