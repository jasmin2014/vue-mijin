export default {
  path: 'reports',
  name: 'Reports',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'ReportJULIXINPage'},
  children: [
    {
      path: 'julixin',
      name: 'ReportJULIXINPage',
      component: () => import('@/pages/risk/reports/julixin.vue'),
      meta: {
        title: '聚立信',
        auth: false,
        show: true
      }
    },
    {
      path: 'tongdun',
      name: 'ReportTONGDUNPage',
      component: () => import('@/pages/risk/reports/tongdun.vue'),
      meta: {
        title: '同盾',
        auth: false,
        show: true
      }
    },
    {
      path: 'yixin',
      name: 'ReportYIXINSharePage',
      component: () => import('@/pages/risk/reports/yixin.vue'),
      meta: {
        title: '宜信',
        auth: false,
        show: true
      }
    },
    {
      path: 'nfcs',
      name: 'ReportNFCSPage',
      component: () => import('@/pages/risk/reports/nfcs.vue'),
      meta: {
        title: 'NFCS',
        auth: false,
        show: true
      }
    },
    {
      path: 'business',
      name: 'ReportSHENGYICANMOUPage',
      component: () => import('@/pages/risk/reports/business.vue'),
      meta: {
        title: '生意参谋',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: '渠道报告',
    auth: false,
    show: false
  }
}
