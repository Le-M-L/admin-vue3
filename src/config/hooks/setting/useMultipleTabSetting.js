// @ts-nocheck
import { computed, unref } from 'vue';
import store from '@/store';

const getMultipleTabSetting = computed(
  () => store.getters['app/getProjectConfig'].multiTabsSetting
);

const getShowMultipleTab = computed(() => unref(getMultipleTabSetting).show);

const getShowQuick = computed(() => unref(getMultipleTabSetting).showQuick);

const getShowRedo = computed(() => unref(getMultipleTabSetting).showRedo);

const getShowFold = computed(() => unref(getMultipleTabSetting).showFold);

function setMultipleTabSetting(multiTabsSetting) {
  store.commit('app/commitProjectConfigState', { multiTabsSetting });
}

export function useMultipleTabSetting() {
  return {
    setMultipleTabSetting,

    getMultipleTabSetting,
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
  };
}
