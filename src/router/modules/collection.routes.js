export default {
  path: 'collection',
  name: 'Collection',
  component: () => import('@/pages/components/public.vue'),
  redirect: {name:'CollectionList'},
  children: [
    {
      path: 'collectionList',
      name: 'CollectionList',
      component: () => import('@/pages/collection/collectionList.vue'),
      meta: {
        title: '催收管理',
        auth: false,
        show: true
      }
    },
    {
      path: 'collectionPushList',
      name: 'collectionPushList',
      component: () => import('@/pages/collection/collectionPushList.vue'),
      meta: {
        title: '催收推送报错',
        auth: false,
        show: true
      }
    }
  ],
  meta: {
    title: '催收管理',
    auth: false,
    show: true
  }
}
