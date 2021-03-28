// @ts-nocheck
import { computed, unref } from 'vue';

import store from '@/store';

const getTransitionSetting = computed(
  () => store.getters['app/getProjectConfig'].transitionSetting
);

const getEnableTransition = computed(() => unref(getTransitionSetting)?.enable);

const getOpenNProgress = computed(() => unref(getTransitionSetting)?.openNProgress);

const getOpenPageLoading = computed(() => {
  return !!unref(getTransitionSetting)?.openPageLoading;
});

const getBasicTransition = computed(() => unref(getTransitionSetting)?.basicTransition);

function setTransitionSetting(transitionSetting) {
  store.commit('app/commitProjectConfigState', { transitionSetting });
}

export function useTransitionSetting() {
  return {
    setTransitionSetting,

    getTransitionSetting,
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
