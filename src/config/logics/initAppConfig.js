// @ts-nocheck
/**
 * 应用程序配置
 */

import store from '@/store';

import { PROJ_CFG_KEY } from '@/config/enums/cacheEnum';
import projectSetting from '@/config/settings/projectSetting';

import { updateHeaderBgColor, updateSidebarBgColor } from '@/config/logics/theme/updateBackground';
import { updateColorWeak } from '@/config/logics/theme/updateColorWeak';
import { updateGrayMode } from '@/config/logics/theme/updateGrayMode';
import { changeTheme } from '@/config/logics/theme';

import { getCommonStoragePrefix, getStorageShortName } from '@/config/utils/env';

import { primaryColor } from '../../../build/config/themeConfig';
import { Persistent } from '@/config/utils/cache/persistent';
import { deepMerge } from '@/config/utils';

// 最初的项目配置
export function initAppConfigStore() {
  console.log(store);
  let projCfg = Persistent.getLocal(PROJ_CFG_KEY);
  projCfg = deepMerge(projectSetting, projCfg || {});
  try {
    const {
      colorWeak,
      grayMode,
      themeColor,
      headerSetting: { bgColor: headerBgColor } = {},
      menuSetting: { bgColor } = {},
    } = projCfg;
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor);
    }
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (error) {
    console.log(error);
  }
  store.commit('app/commitProjectConfigState', projCfg);
  store.dispatch('locale/initLocale');

  setTimeout(() => {
    clearObsoleteStorage();
  }, 16);
}

/**
 *随着版本的不断迭代，会有越来越多的缓存键存储在localStorage中。
 *此方法用于删除无用的键
 */
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
