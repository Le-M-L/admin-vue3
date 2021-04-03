import { LAYOUT } from '@/router/constant';

const dashboard = {
  path: '/about',
  name: 'About',
  component: LAYOUT,
  redirect: '/about/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '关于',
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('@/views/sys/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default dashboard;
