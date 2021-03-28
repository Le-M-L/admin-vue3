import { computed, toRaw, unref } from 'vue';

import store from '@/store';
import { uniqBy } from 'lodash-es';

import { useMultipleTabSetting } from '@/config/hooks/setting/useMultipleTabSetting';

import router from '@/router';

export function useFrameKeepAlive() {
  const { currentRoute } = router;
  const { getShowMultipleTab } = useMultipleTabSetting();

  const getFramePages = computed(() => {
    const ret = getAllFramePages(toRaw(router.getRoutes())) || [];
    return ret;
  });

  const getOpenTabList = computed(() => {
    return store.getters['tab/getTabsState'].reduce((prev, next) => {
      if (next.meta && Reflect.has(next.meta, 'frameSrc')) {
        prev.push(next.name);
      }
      return prev;
    }, []);
  });

  function getAllFramePages(routes) {
    let res = [];
    for (const route of routes) {
      const { meta: { frameSrc } = {}, children } = route;
      if (frameSrc) {
        res.push(route);
      }
      if (children && children.length) {
        res.push(...getAllFramePages(children));
      }
    }
    res = uniqBy(res, 'name');
    return res;
  }

  function showIframe(item) {
    return item.name === unref(currentRoute).name;
  }

  function hasRenderFrame(name) {
    if (!unref(getShowMultipleTab)) {
      return router.currentRoute.value.name === name;
    }
    return unref(getOpenTabList).includes(name);
  }

  return { hasRenderFrame, getFramePages, showIframe, getAllFramePages };
}
