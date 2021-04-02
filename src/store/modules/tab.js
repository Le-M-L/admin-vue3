// @ts-nocheck

import { toRaw, unref } from 'vue';

import { PageEnum } from '@/config/enums/pageEnum';

import router from '@/router';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@/router/routes/basic';
import { getRawRoute } from '@/config/utils';

import { useGo, useRedo } from '@/config/hooks/web/usePage';
import { cloneDeep } from 'lodash-es';

function isGotoPage() {
  const go = useGo();
  go(unref(router.currentRoute).path, true);
}
export default {
  state: {
    cachedTabsState: new Set(),
    tabsState: [], //tab list
    lastDragEndIndexState: 0,
  },
  getters: {
    getTabsState: (state) => state.tabsState,
    getCurrentTab: (state) => {
      const route = unref(router.currentRoute);
      return state.tabsState.find((item) => item.path === route.path);
    },
    getCachedTabsState: (state) => Array.from(state.cachedTabsState),
    getLastDragEndIndexState: (state) => state.lastDragEndIndexState,
  },
  mutations: {
    commitClearCache(state) {
      state.cachedMapState = new Set();
    },
    goToPage(state) {
      const go = useGo();
      const len = state.tabsState.length;
      const { path } = unref(router.currentRoute);

      let toPath = PageEnum.BASE_HOME;

      if (len > 0) {
        const page = state.tabsState[len - 1];
        const p = page.fullPath || page.path;
        if (p) {
          toPath = p;
        }
      }
      // 跳转到当前页面并报告错误
      path !== toPath && go(toPath, true);
    },
    commitCachedMapState(state) {
      const cacheMap = new Set();
      state.tabsState.forEach((tab) => {
        const item = getRawRoute(tab);
        const needCache = !item.meta?.ignoreKeepAlive;
        if (!needCache) return;
        const name = item.name;
        cacheMap.add(name);
      });
      this.cachedTabsState = cacheMap;
    },
    commitTabRoutesState(state, route) {
      const { path, fullPath, params, query } = route;

      let updateIndex = -1;
      // 已存在的页面，不要重复添加标签
      const hasTab = state.tabsState.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });
      if (hasTab) {
        const curTab = toRaw(state.tabsState)[updateIndex];
        if (!curTab) return;
        curTab.params = params || curTab.params;
        curTab.query = query || curTab.query;
        curTab.fullPath = fullPath || curTab.fullPath;
        state.tabsState.splice(updateIndex, 1, curTab);
        return;
      }
      state.tabsState = cloneDeep([...state.tabsState, route]);
    },
    // 关闭 tab
    commitCloseTab(state, route) {
      const { fullPath, meta: { affix } = {} } = route;
      if (affix) return;
      const index = state.tabsState.findIndex((item) => item.fullPath === fullPath);
      index !== -1 && state.tabsState.splice(index, 1);
    },
    commitCloseAllTab(state) {
      state.tabsState = state.tabsState.filter((item) => {
        return item.meta && item.meta.affix;
      });
    },
    commitResetState(state) {
      state.tabsState = [];
      state.cachedTabsState = new Set();
    },
    commitSortTabs(state, { oldIndex, newIndex }) {
      const currentTab = state.tabsState[oldIndex];
      state.tabsState.splice(oldIndex, 1);
      state.tabsState.splice(newIndex, 0, currentTab);
      state.lastDragEndIndexState = state.lastDragEndIndexState + 1;
    },
    closeMultipleTab(state, { pathList }) {
      state.tabsState = toRaw(state.tabsState).filter((item) => !pathList.includes(item.fullPath));
    },
    async commitRedoPage(state) {
      const route = router.currentRoute.value;
      const name = route.name;

      const findVal = Array.from(state.cachedTabsState).find((item) => item === name);
      if (findVal) {
        state.cachedTabsState.delete(findVal);
        // this.cachedTabsState.splice(index, 1);
      }
      const redo = useRedo();
      await redo();
    },
  },
  actions: {
    addTabAction(context, route) {
      let { commit } = context;
      const { path, name } = route;
      // 404  The page does not need to add a tab
      if (
        path === PageEnum.ERROR_PAGE ||
        !name ||
        [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name)
      ) {
        return;
      }
      commit('commitTabRoutesState', getRawRoute(route));
      commit('commitCachedMapState');
    },
    closeAllTabAction(context) {
      let { commit } = context;
      commit('commitCloseAllTab');
      commit('commitClearCache');
      commit('goToPage');
    },
    closeTabAction(context, tab) {
      let { commit, getters } = context;
      function getObj(tabItem) {
        const { params, path, query } = tabItem;
        return {
          params: params || {},
          path,
          query: query || {},
        };
      }
      const { currentRoute, replace } = router;

      const { path } = unref(currentRoute);
      if (path !== tab.path) {
        //关闭不是激活选项卡
        commit('commitCloseTab', tab);
        return;
      }

      // 关闭激活的选项卡
      let toObj = {};
      const index = getters.getTabsState.findIndex((item) => item.path === path);

      // 如果当前选项卡位于最左边
      if (index === 0) {
        // 只有一个标签，然后跳转到主页，否则跳转到右边的标签
        if (getters.getTabsState.length === 1) {
          toObj = PageEnum.BASE_HOME;
        } else {
          //  跳到右边的标签
          const page = getters.getTabsState[index + 1];
          toObj = getObj(page);
        }
      } else {
        // 关闭当前选项卡
        const page = getters.getTabsState[index - 1];
        toObj = getObj(page);
      }
      commit('commitCloseTab', currentRoute.value);
      replace(toObj);
    },
    closeTabByKeyAction(context, key) {
      let { dispatch, state } = context;
      const index = state.tabsState.findIndex((item) => (item.fullPath || item.path) === key);
      index !== -1 && dispatch('closeTabAction', state.tabsState[index]);
    },
    closeLeftTabAction(context, route) {
      let { commit, dispatch, state } = context;
      const index = state.tabsState.findIndex((item) => item.path === route.path);

      if (index > 0) {
        const leftTabs = state.tabsState.slice(0, index);
        const pathList = [];
        for (const item of leftTabs) {
          const affix = item.meta ? item.meta.affix : false;
          if (!affix) {
            pathList.push(item.fullPath);
          }
        }
        dispatch('closeMultipleTab', { pathList });
      }
      commit('commitCachedMapState');
      isGotoPage();
    },
    closeRightTabAction(context, route) {
      let { commit, dispatch, state } = context;
      const index = state.tabsState.findIndex((item) => item.fullPath === route.fullPath);

      if (index >= 0 && index < state.tabsState.length - 1) {
        const rightTabs = state.tabsState.slice(index + 1, state.tabsState.length);

        const pathList = [];
        for (const item of rightTabs) {
          const affix = item.meta ? item.meta.affix : false;
          if (!affix) {
            pathList.push(item.fullPath);
          }
        }
        dispatch('closeMultipleTab', { pathList });
      }
      commit('commitCachedMapState');
      isGotoPage();
    },
    closeOtherTabAction(context, route) {
      let { commit, dispatch, state } = context;
      const closePathList = state.tabsState.map((item) => item.fullPath);
      const pathList = [];
      closePathList.forEach((path) => {
        if (path !== route.fullPath) {
          const closeItem = state.tabsState.find((item) => item.path === path);
          if (!closeItem) return;
          const affix = closeItem.meta ? closeItem.meta.affix : false;
          if (!affix) {
            pathList.push(closeItem.fullPath);
          }
        }
      });
      dispatch('closeMultipleTab', { pathList });
      commit('commitCachedMapState');
      isGotoPage();
    },
  },
};
