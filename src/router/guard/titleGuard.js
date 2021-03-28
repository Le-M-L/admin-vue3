// @ts-nocheck
import { useGlobSetting } from '@/config/hooks/setting';

import { setTitle } from '@/config/utils';

import { REDIRECT_NAME } from '@/router/constant';

const globSetting = useGlobSetting();

export function createTitleGuard(router) {
  router.afterEach(async (to) => {
    to.name !== REDIRECT_NAME && setTitle(to.meta.title, globSetting.title);
    return true;
  });
}
