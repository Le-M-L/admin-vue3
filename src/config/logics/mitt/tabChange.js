// @ts-nocheck
/**
 * 用于监视路由变化，以改变菜单和选项卡的状态。不需要监控路由，因为路由状态的变化会受到页面渲染时间的影响，会比较慢
 */

import Mitt from '@/config/utils/mitt';
import { getRawRoute } from '@/config/utils';

const mitt = new Mitt();

const key = Symbol();

let lastChangeTab;

export function setLastChangeTab(lastChangeRoute) {
  const r = getRawRoute(lastChangeRoute);
  mitt.emit(key, r);
  lastChangeTab = r;
}

export function listenerLastChangeTab(callback, immediate = true) {
  mitt.on(key, callback);
  immediate && lastChangeTab && callback(lastChangeTab);
}

export function removeTabChangeListener() {
  mitt.clear();
}
