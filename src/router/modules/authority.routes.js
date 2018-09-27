export default {
  path: 'authority',
  name: 'Authority',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'AuthorityAccountPage'},
  children: [
    {
      path: 'account',
      name: 'AuthorityAccountPage',
      component: () => import('@/pages/authority/account.vue'),
      meta: {
        title: '账号管理',
        auth: false,
        show: true
      }
    },
    {
      path: 'role',
      name: 'AuthorityRolePage',
      component: () => import('@/pages/authority/role.vue'),
      meta: {
        title: '角色管理',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: '权限管理',
    auth: false,
    show: true
  }
}
