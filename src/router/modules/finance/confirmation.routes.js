export default {
  path: 'confirmation',
  name: 'Confirmation',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name: 'ConfirmList'},
  children: [
    {
      path: 'confirmlist',
      name: 'ConfirmList',
      component: () => import('@/pages/finance/confirm/confirmList.vue'),
      meta: {
        title: '线下还款到账确认',
        auth: false,
        show: true
      }
    },
    {
      path: 'overdueRelief',
      name: 'OverdueReliefPage',
      component: () => import('@/pages/finance/confirm/overdueReliefList.vue'),
      meta: {
        title: '逾期减免确认',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: '财务确认',
    auth: false,
    show: true
  }
}
