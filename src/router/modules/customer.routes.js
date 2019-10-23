export default {
  path: 'customer',
  name: 'Customer',
  component: () => import('@/pages/components/public.vue'),
  redirect: { name:'CustomerList' },
  children: [
    {
      path: 'customerlist',
      name: 'CustomerList',
      component: () => import('@/pages/customer/customer.vue'),
      meta: {
        title: '用户基本信息',
        auth: false,
        show: true
      }
    },
    {
      path: 'detail/:id',
      name: 'CustomerDetail',
      component: () => import('@/pages/customer/customerDetail.vue'),
      meta: {
        title: '用户基本信息-详情',
        auth: false,
        show: false
      }
    }
  ],
  meta: {
    title: '客服管理',
    auth: false,
    show: true
  }
}
