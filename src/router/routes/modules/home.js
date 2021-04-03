// @ts-nocheck
import { LAYOUT } from '@/router/constant';
import { HomeOutlined } from '@ant-design/icons-vue';

const dashboard = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/welcome',
  meta: {
    icon: <HomeOutlined />,
    title: '首页',
  },
  children: [
    {
      path: 'welcome',
      name: '首页',
      component: () => import('@/views/dashboard/welcome/index.vue'),
      meta: {
        title: '首页',
        affix: true,
        icon: <HomeOutlined />,
      },
    },
  ],
};

export default dashboard;
