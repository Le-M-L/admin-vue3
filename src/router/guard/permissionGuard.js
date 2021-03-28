// @ts-nocheck

import store from '@/store';

import { PageEnum } from '@/config/enums/pageEnum';
import { userStore } from '@/store/modules/user';

import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList = [LOGIN_PATH];

export function createPermissionGuard(router) {
  router.beforeEach(async (to, from, next) => {
    // 在处理登录后跳转到404页面
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.BASE_HOME);
      return;
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path)) {
      next();
      return;
    }

    const token = userStore.getTokenState;

    // 令牌不存在
    if (!token) {
      // 你可以不经允许进入。您需要设置 meta.ignoreAuth true
      if (
        to.meta.ignoreAuth
        // || to.name === FULL_PAGE_NOT_FOUND_ROUTE.name
      ) {
        next();
        return;
      }
      // 登录页面重定向
      const redirectData = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }
    if (store.getters['permission/getIsDynamicAddedRouteState']) {
      next();
      return;
    }
    const routes = await store.dispatch('permission/buildRoutesAction');

    routes.forEach((route) => {
      router.addRoute(route);
    });

    const redirectPath = from.query.redirect || to.path;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    store.commit('permission/commitDynamicAddedRouteState', true);
    next(nextData);
  });
}
