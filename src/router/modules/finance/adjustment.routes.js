export default {
  path: 'adjustment',
  name: 'Adjustment',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name: 'AdjustmentAll'},
  children: [
    {
      path: 'overall',
      name: 'AdjustmentAll',
      component: () => import('@/pages/finance/financial/overall.vue'),
      meta: {
        title: '调账管理(全部)',
        auth: false,
        show: true
      }
    },
    {
      path: 'overall/:id',
      name: 'AdjustmentDetail',
      component: () => import('@/pages/finance/financial/adjustment/detail.vue'),
      meta: {
        title: '调账详情',
        auth: false,
        show: false
      }
    },
    {
      path: 'deal',
      name: 'AdjustmentDeal',
      component: () => import('@/pages/finance/financial/deal.vue'),
      meta: {
        title: '调账管理(待办)',
        auth: false,
        show: true
      }
    },
    {
      path: 'apply',
      name: 'ApplyAdjustment',
      component: () => import('@/pages/finance/financial/adjustment/apply.vue'),
      meta: {
        title: '申请制单',
        auth: false,
        show: false
      }
    }
  ],
  meta: {
    title: '调账管理',
    auth: false,
    show: true
  }
}
