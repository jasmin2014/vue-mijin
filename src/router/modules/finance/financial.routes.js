export default {
  path: 'financial',
  name: 'Financial',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name: 'FinancialLoanListPage'},
  children: [
    {
      path: 'mlist',
      name: 'FinancialLoanListPage',
      component: () => import('@/pages/finance/financial/mlist.vue'),
      meta: {
        title: '财务放款列表',
        auth: false,
        show: true
      }
    },
    {
      path: 'detail/:id',
      name: 'financialLoanListDetail',
      component: () => import('@/pages/finance/financial/mlist/detail.vue'),
      meta: {
        title: '财务审核-详情',
        auth: false,
        show: false
      }
    },
    {
      path: 'mloan/:id',
      name: 'financialLoanListLoan',
      component: () => import('@/pages/finance/financial/mlist/mloan.vue'),
      meta: {
        title: '财务放款',
        auth: false,
        show: false
      }
    },
    {
      path: 'manage',
      name: 'financialLoanPage',
      component: () => import('@/pages/finance/financial/manage.vue'),
      meta: {
        title: '放款产品管理',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: '财务审核',
    auth: false,
    show: true
  }
}
