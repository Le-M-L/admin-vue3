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
      redirect: '/comp/table/basic',
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
    {
      path: 'modal',
      name: '弹窗组件',
      component: () => import('@/views/demo/comp/modal/index.vue'),
      meta: {
        title: '弹窗组件',
      },
    },
    {
      path: 'upload',
      name: '上传组件',
      component: () => import('@/views/demo/comp/upload/index.vue'),
      meta: {
        title: '上传组件',
      },
    },
    {
      path: 'loading',
      name: 'Loading',
      component: () => import('@/views/demo/comp/loading/index.vue'),
      meta: {
        title: 'Loading',
      },
    },
    {
      path: 'scroll',
      name: '滚动组件',
      component: () => import('@/views/demo/comp/scroll/index.vue'),
      meta: {
        title: '滚动组件',
      },
    },
    {
      path: 'verify',
      name: '验证组件',
      component: getParentLayout('VerifyDemo'),
      redirect: '/comp/verify/drag',
      meta: {
        title: '验证组件',
      },
      children: [
        {
          path: 'drag',
          name: '拖拽校验',
          component: () => import('@/views/demo/comp/verify/index.vue'),
          meta: {
            title: '拖拽校验',
          },
        },
        {
          path: 'rotate',
          name: '旋转校验',
          component: () => import('@/views/demo/comp/verify/Rotate.vue'),
          meta: {
            title: '旋转校验',
          },
        },
      ],
    },
    {
      path: 'countTo',
      name: '数字动画',
      component: () => import('@/views/demo/comp/count-to/index.vue'),
      meta: {
        title: '数字动画',
      },
    },
    {
      path: 'timestamp',
      name: '相对时间',
      component: () => import('@/views/demo/comp/time/index.vue'),
      meta: {
        title: '相对时间',
      },
    },
  ],
};
export default comp;
