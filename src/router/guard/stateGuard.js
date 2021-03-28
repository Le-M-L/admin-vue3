// @ts-nocheck
import store from '@/store';
import { PageEnum } from '@/config/enums/pageEnum';
import { removeTabChangeListener } from '@/logics/mitt/tabChange';

export function createStateGuard(router) {
  router.afterEach((to) => {
    // 只需进入登录页面，清除认证信息即可
    if (to.path === PageEnum.BASE_LOGIN) {
      store.dispatch('app/resumeAllState');
      store.dispatch('permission/commitResetState');
      store.dispatch('tab/commitResetState');
      store.dispatch('user/commitResetState');
      removeTabChangeListener();
    }
  });
}
