export default {
  path: 'banner',
  name: 'banner',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'BannerList'},
  children: [
    {
      path: 'banner',
      name: 'BannerList',
      component: () => import('@/pages/banner/bannerConfig.vue'),
      meta: {
        title: 'banner配置管理',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: 'banner配置管理',
    auth: false,
    show: true
  }
}
