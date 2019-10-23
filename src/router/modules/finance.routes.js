import credit from './finance/credit.routes';
import confirmation from './finance/confirmation.routes';
import adjustment from './finance/adjustment.routes';
import repay from './finance/repay.routes';

export default {
  path: 'finance',
  name: 'Finance',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'Financial'},
  children: [
    credit,
    {
      path: 'loan',
      name: 'FinanceProvideLoanPage',
      component: () => import('@/pages/finance/loan/loanList.vue'),
      meta: {
        title: '贷款管理',
        auth: false,
        show: true
      }
    },
    {
      path: 'detail/:id',
      name: 'provideLoanDetail',
      component: () => import('@/pages/finance/loan/loanDetail.vue'),
      meta: {
        title: '贷款管理-详情',
        auth: false,
        show: false
      }
    },
    confirmation,
    adjustment,
    repay,
    {
      path: 'flow',
      name: 'RepaymentCapitalflow',
      component: () => import('@/pages/finance/flow.vue'),
      meta: {
        title: '资金流水',
        auth: false,
        show: true
      }
    },
    {
      path: 'accountBlc',
      name: 'accountBlcPage',
      component: () => import('@/pages/finance/accountBlcMgt.vue'),
      meta: {
        title: '账户余额管理',
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
