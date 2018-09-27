import financial from './finance/financial.routes';
import adjustment from './finance/adjustment.routes';
import repay from './finance/repay.routes';

export default {
  path: 'finance',
  name: 'Finance',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'Financial'},
  children: [
    financial,
    {
      path: 'detail/:id',
      name: 'provideLoanDetail',
      component: () => import('@/pages/finance/loan/detail.vue'),
      meta: {
        title: '贷款管理-详情',
        auth: false,
        show: false
      }
    },
    {
      path: 'loan',
      name: 'FinanceProvideLoanPage',
      component: () => import('@/pages/finance/loan.vue'),
      meta: {
        title: '贷款管理',
        auth: false,
        show: true
      }
    },
    repay,
    adjustment,
    {
      path: 'flow',
      name: 'RepaymentCapitalflow',
      component: () => import('@/pages/finance/flow.vue'),
      meta: {
        title: '资金流水',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: '财务管理',
    auth: false,
    show: true
  }
}
