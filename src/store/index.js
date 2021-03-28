// @ts-nocheck
import { createStore } from 'vuex';

import { isDevMode } from '@/config/utils/env';

import { importAll } from '@/config/utils';
let modulesArr = importAll(require.context('./modules', false, /\.js$/));

let modules = {};
// 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突
Object.keys(modulesArr).forEach((key) => {
  modules[key] = { ...modulesArr[key].default, namespaced: true };
});

const store = createStore({
  modules: modules,
  strict: isDevMode(), //判断是否是开发模式
  // plugins,
});

export function setupStore(app) {
  app.use(store);
}
export default store;
