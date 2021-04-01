// @ts-nocheck
//引入404页面，重定向页面
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';
//退出页面
import { mainOutRoutes } from './mainOut';
import { PageEnum } from '@/config/enums/pageEnum';
//引入模块
import { importAll } from '@/config/utils';

const modules = importAll(require.context('./modules', true, /\.js$/));

//获取modules下的路由
const routeModuleList = [];
Object.keys(modules).forEach((item) => {
  Object.keys(modules[item]).forEach((key) => {
    routeModuleList.push(modules[item][key]);
  });
});
console.log(modules)
export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/sys/login/Login.vue'),
  meta: {
    title: '登录页',
  },
};

// 基础路由 无权限
export const basicRoutes = [LoginRoute, RootRoute, ...mainOutRoutes, REDIRECT_ROUTE];
