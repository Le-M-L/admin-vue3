// @ts-nocheck
import { LOCALE_KEY } from '@/config/enums/cacheEnum';

import { createLocalStorage } from '@/config/utils/cache';
import { localeSetting } from '@/config/settings/localeSetting';

const ls = createLocalStorage();

const lsSetting = ls.get(LOCALE_KEY) || localeSetting;

export default {
  state: {
    info: lsSetting,
  },
  getters: {
    getShowPicker: (state) => !!state.info?.showPicker,
    getLocale: (state) => state.info?.locale,
  },
  mutations: {
    setLocaleInfo(state, info) {
      state.info = { ...state.info, ...info };
      ls.set(LOCALE_KEY, state.info);
    },
  },
  actions: {
    initLocale(context) {
      let { commit, state } = context;
      commit('setLocaleInfo', {
        ...localeSetting,
        ...state.info,
      });
    },
  },
};
