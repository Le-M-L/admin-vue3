// @ts-nocheck
import { setLastChangeTab } from '@/config/logics/mitt/tabChange';

export function createPageGuard(router) {
  const loadedPageMap = new Map();

  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // 通知路由变化
    setLastChangeTab(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}
