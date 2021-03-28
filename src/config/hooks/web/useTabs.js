// @ts-nocheck
import store from '@/store';

export function useTabs() {
  function canIUseFn() {
    const { multiTabsSetting: { show } = {} } = store.getters['app/getProjectConfig'];
    if (!show) {
      throw new Error('The multi-tab page is currently not open, please open it in the settings！');
    }
    return !!show;
  }

  return {
    refreshPage: async () => {
      if (canIUseFn()) {
        await store.commit('tab/commitRedoPage');
      }
    },
    closeAll: () => canIUseFn() && store.dispatch('tab/closeAllTabAction'),
    closeLeft: () =>
      canIUseFn() && store.dispatch('tab/closeLeftTabAction', store.getters['tab/getCurrentTab']),
    closeRight: () =>
      canIUseFn() && store.dispatch('tab/closeRightTabAction', store.getters['tab/getCurrentTab']),
    closeOther: () =>
      canIUseFn() && store.dispatch('tab/closeOtherTabAction', store.getters['tab/getCurrentTab']),
    closeCurrent: () =>
      canIUseFn() && store.dispatch('tab/closeTabAction', store.getters['tab/getCurrentTab']),
    close: (tab) =>
      canIUseFn() &&
      store.dispatch('tab/closeTabAction', tab || store.getters['tab/getCurrentTab']),
  };
}
