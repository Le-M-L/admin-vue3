// @ts-nocheck
import { toRaw, ref, nextTick } from 'vue';
import { useDesign } from '@/config/hooks/web/useDesign';
import { useSortable } from '@/config/hooks/web/useSortable';
import router from '@/router';
import store from '@/store';
import { isNullAndUnDef } from '@/config/utils/is';
import projectSetting from '@/config/settings/projectSetting';

export function initAffixTabs() {
  const affixList = ref([]);
  /**
   * @description: Filter all fixed routes
   */
  function filterAffixTabs(routes) {
    const tabs = [];
    routes &&
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push(toRaw(route));
        }
      });
    return tabs;
  }

  /**
   * @description: Set fixed tabs
   */
  function addAffixTabs() {
    const affixTabs = filterAffixTabs(router.getRoutes());
    affixList.value = affixTabs;
    for (const tab of affixTabs) {
      store.dispatch('tab/addTabAction', {
        meta: tab.meta,
        name: tab.name,
        path: tab.path,
      });
    }
  }

  let isAddAffix = false;
  if (!isAddAffix) {
    addAffixTabs();
    isAddAffix = true;
  }
  return affixList.value.map((item) => item.meta?.title).filter(Boolean);
}

export function useTabsDrag(affixTextList) {
  const { multiTabsSetting } = projectSetting;

  const { prefixCls } = useDesign('multiple-tabs');
  nextTick(() => {
    if (!multiTabsSetting.canDrag) return;
    const el = document.querySelectorAll(`.${prefixCls} .ant-tabs-nav > div`)?.[0];
    const { initSortable } = useSortable(el, {
      filter: (e) => {
        const text = e?.target?.innerText;
        if (!text) return false;
        return affixTextList.includes(text);
      },
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;

        if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
          return;
        }
        store.commit('tab/commitSortTabs', { oldIndex, newIndex });
      },
    });
    initSortable();
  });
}
