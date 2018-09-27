export default {
  path: 'setup',
  name: 'Setup',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'SystemPage'},
  children: [
    {
      path: 'system',
      name: 'SystemPage',
      component: () => import('@/pages/system/system.vue'),
      meta: {
        title: '配置管理',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: '系统管理',
    auth: false,
    show: true
  }
}
