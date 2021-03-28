import { computed, toRaw } from 'vue';

import { unref } from 'vue';
import { uniq } from 'lodash-es';
import { getAllParentPath } from '@/router/helper/menuHelper';

import { useTimeoutFn } from '@/config/hooks/core/useTimeout';

export function useOpenKeys(
  menuState,
  menus,
  accordion,
  mixSider,
  collapse
  // mode: Ref<MenuModeEnum>,
) {
  async function setOpenKeys(path) {
    // if (mode.value === MenuModeEnum.HORIZONTAL) {
    //   return;
    // }
    const native = !mixSider.value;
    useTimeoutFn(
      () => {
        const menuList = toRaw(menus.value);
        if (menuList?.length === 0) {
          menuState.activeSubMenuNames = [];
          menuState.openNames = [];
          return;
        }
        const keys = getAllParentPath(menuList, path);
        if (!unref(accordion)) {
          menuState.openNames = uniq([...menuState.openNames, ...keys]);
        } else {
          menuState.openNames = keys;
        }
        menuState.activeSubMenuNames = menuState.openNames;
      },
      16,
      native
    );
  }

  const getOpenKeys = computed(() => {
    return unref(collapse) ? [] : menuState.openNames;
  });

  return { setOpenKeys, getOpenKeys };
}
