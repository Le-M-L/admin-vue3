// @ts-nocheck
import { useTransitionSetting } from '@/config/hooks/setting/useTransitionSetting';

import nProgress from 'nprogress';

import { unref } from 'vue';

const { getOpenNProgress } = useTransitionSetting();

export function createProgressGuard(router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    // if (to.meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
