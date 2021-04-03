import { getParentLayout, LAYOUT } from '@/router/constant';

const comp = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/basic',
  meta: {
    icon: 'ion:layers-outline',
    title: '组件',
  },
  children: [
    {
      path: 'collapse',
      name: '卡片折叠',
      component: () => import('@/views/demo/comp/collapse/index.vue'),
      meta: {
        title: '卡片折叠',
      },
    },
    {
      path: 'desc',
      name: '详情组件',
      component: () => import('@/views/demo/comp/desc/index.vue'),
      meta: {
        title: '详情组件',
      },
    },

    {
      path: 'table',
      name: '表格组件',
      component: getParentLayout('TableDemo'),
      meta: {
        title: '表格组件',
      },
      children: [
        {
          path: 'basic',
          name: '基础表格',
          component: () => import('@/views/demo/table/Basic.vue'),
          meta: {
            title: '基础表格',
          },
        },
      ],
    },
  ],
};
export default comp;
