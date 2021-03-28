// @ts-nocheck
import store from '@/store';
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting';
import { unref } from 'vue';

const { getOpenPageLoading } = useTransitionSetting();
export function createPageLoadingGuard(router) {
  router.beforeEach(async (to) => {
    if (!store.getters['user/getTokenState']) {
      return true;
    }
    if (to.meta.loaded) {
      return true;
    }

    if (unref(getOpenPageLoading)) {
      store.dispatch('app/setPageLoadingAction', true);
      return true;
    }

    return true;
  });
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      setTimeout(() => {
        store.commit('app/commitPageLoadingState', false);
      }, 300);
    }
    return true;
  });
}
