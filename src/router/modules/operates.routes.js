export default {
  path: 'operate',
  name: 'Operate',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'OperateManagePage'},
  children: [
    {
      path: 'display',
      name: 'OperateManagePage',
      component: () => import('@/pages/operate/display.vue'),
      meta: {
        title: '账户显示配置',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: '运营管理',
    auth: false,
    show: true
  }
}
