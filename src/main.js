// @ts-nocheck
import '@/design/index.less';
import 'tailwindcss/tailwind.css';

import { createApp } from 'vue';
import App from './App.vue';
import '@/api/mock/index';
import router, { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupErrorHandle } from '@/config/logics/error-handle';
import { setupGlobDirectives } from '@/config/directives';
import { registerGlobComp } from '@/components/comps/registerGlobComp';
import { isDevMode } from '@/config/utils/env';

(async () => {
  const app = createApp(App);
  // 注册全局组件
  registerGlobComp(app);

  // 配置路由
  setupRouter(app);

  // 配置vuex 状态管理
  setupStore(app);

  // 注册全局指令
  setupGlobDirectives(app);

  // 配置全局错误处理
  setupErrorHandle(app);

  // 当路由准备好时就挂载
  await router.isReady();

  app.mount('#app', true);

  //   // 开发环境生效
  if (isDevMode()) {
    // app.config.performance = true;
    window.__APP__ = app;
  }
})();
