// @ts-nocheck
import { PROJ_CFG_KEY } from '@/config/enums/cacheEnum';
import { Persistent } from '@/config/utils/cache/persistent';
import { deepMerge } from '@/config/utils'; //深拷贝
import { resetRouter } from '@/router';

let timeId;
export default {
  state: {
    pageLoadingState: false, //页面加载状态
    projectConfigState: Persistent.getLocal(PROJ_CFG_KEY), //项目配置
    lockMainScrollState: false, //设置主要 隐藏
    beforeMiniState: {}, //当窗口收缩时，记住一些状态，并在窗口恢复时恢复这些状态
  },
  getters: {
    getPageLoading: (state) => state.pageLoadingState,
    getBeforeMiniState: (state) => state.beforeMiniState,
    getLockMainScrollState: (state) => state.lockMainScrollState,
    getProjectConfig: (state) => state.projectConfigState || {}, //获取项目配置
  },
  mutations: {
    commitPageLoadingState: (state, loading) => (state.pageLoadingState = loading),
    commitBeforeMiniState: (state, miniState) => (state.beforeMiniState = miniState),
    commitLockMainScrollState: (state, lock) => (state.lockMainScrollState = lock),
    //初始化触发 储存初始化全局数据
    commitProjectConfigState: (state, proCfg) => {
      state.projectConfigState = deepMerge(state.projectConfigState || {}, proCfg);
      //设置缓存
      Persistent.setLocal(PROJ_CFG_KEY, state.projectConfigState);
    },
  },
  actions: {
    async resumeAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    async setPageLoadingAction(context, loading) {
      let { commit } = context;
      if (loading) {
        clearTimeout(timeId);
        // 防止闪烁
        timeId = setTimeout(() => {
          commit('commitPageLoadingState', loading);
        }, 50);
      } else {
        commit('commitPageLoadingState', loading);
        clearTimeout(timeId);
      }
    },
  },
};
