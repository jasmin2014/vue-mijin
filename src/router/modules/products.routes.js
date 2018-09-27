export default {
  path: 'products',
  name: 'ProManage',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'ProductsList'},
  children: [
    {
      path: 'list',
      name: 'ProductsList',
      component: () => import('@/pages/products/products.vue'),
      meta: {
        title: '产品',
        auth: false,
        show: true
      }
    },
    {
      path: 'strategies',
      name: 'ProductsStrategyList',
      component: () => import('@/pages/products/strategies.vue'),
      meta: {
        title: '产品策略',
        auth: false,
        show: true
      }
    },
    {
      path: 'detail/:id',
      name: 'ProductsStrategyDetail',
      component: () => import('@/pages/products/strategies/strategyDetail.vue'),
      meta: {
        title: '产品策略-详情',
        auth: false,
        show: false
      }
    }
  ],
  meta: {
    title: '产品管理',
    auth: false,
    show: true
  }
}
