export default {
  path: 'repay',
  name: 'Repay',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name: 'alreadyRepayList'},
  children: [
    {
      path: 'already',
      name: 'alreadyRepayList',
      component: () => import('@/pages/finance/repay/alreadyList.vue'),
      meta: {
        title: '已还款信息',
        auth: false,
        show: true
      }
    },
    {
      path: 'detail/:id',
      name: 'alreadyRepayDetail',
      component: () => import('@/pages/finance/repay/alreadyDetail.vue'),
      meta: {
        title: '已还款明细',
        auth: false,
        show: false
      }
    },
    {
      path: 'wait',
      name: 'waitRepayList',
      component: () => import('@/pages/finance/repay/waitList.vue'),
      meta: {
        title: '待还款信息',
        auth: false,
        show: true
      }
    },
    {
      path: 'detail/:id',
      name: 'waitRepayDetail',
      component: () => import('@/pages/finance/repay/waitDetail.vue'),
      meta: {
        title: '待还款明细',
        auth: false,
        show: false
      }
    },
    {
      path: 'detail',
      name: 'repayDetailList',
      component: () => import('@/pages/finance/repay/repayDetailList.vue'),
      meta: {
        title: '还款明细查询',
        auth: false,
        show: true
      }
    },
  ],
  meta: {
    title: '还款管理',
    auth: false,
    show: true
  }
}
