// @ts-nocheck
import { LAYOUT } from '@/router/constant';

const dashboard = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/welcome',
  meta: {
    icon: 'ion:home-outline',
    title: 'welcome',
  },
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('@/views/dashboard/welcome/index.vue'),
      meta: {
        title: 'welcome',
        affix: true,
        icon: 'bx:bx-home',
      },
    },
  ],
};

export default dashboard;
