// @ts-nocheck
import { computed, unref } from 'vue';

import store from '@/store';
import { useMenuSetting } from '@/config/hooks/setting/useMenuSetting';
import { useRootSetting } from '@/config/hooks/setting/useRootSetting';
import { useFullContent } from '@/config/hooks/web/useFullContent';

import { MenuModeEnum } from '@/config/enums/menuEnum';

const { getFullContent } = useFullContent();
const {
  getMenuMode,
  getSplit,
  getShowHeaderTrigger,
  getIsSidebarType,
  getIsMixSidebar,
  getIsTopMenu,
} = useMenuSetting();
const { getShowBreadCrumb, getShowLogo } = useRootSetting();

const getShowMixHeaderRef = computed(() => !unref(getIsSidebarType) && unref(getShowHeader));

const getShowFullHeaderRef = computed(() => {
  return (
    !unref(getFullContent) &&
    unref(getShowMixHeaderRef) &&
    unref(getShowHeader) &&
    !unref(getIsTopMenu) &&
    !unref(getIsMixSidebar)
  );
});

const getShowInsetHeaderRef = computed(() => {
  const need = !unref(getFullContent) && unref(getShowHeader);
  return (
    (need && !unref(getShowMixHeaderRef)) ||
    (need && unref(getIsTopMenu)) ||
    (need && unref(getIsMixSidebar))
  );
});

// Get header configuration
const getHeaderSetting = computed(() => store.getters['app/getProjectConfig'].headerSetting);

const getShowDoc = computed(() => unref(getHeaderSetting).showDoc);

const getHeaderTheme = computed(() => unref(getHeaderSetting).theme);

const getShowHeader = computed(() => unref(getHeaderSetting).show);

const getFixed = computed(() => unref(getHeaderSetting).fixed);

const getHeaderBgColor = computed(() => unref(getHeaderSetting).bgColor);

const getShowSearch = computed(() => unref(getHeaderSetting).showSearch);

const getUseLockPage = computed(() => unref(getHeaderSetting).useLockPage);

const getShowFullScreen = computed(() => unref(getHeaderSetting).showFullScreen);

const getShowNotice = computed(() => unref(getHeaderSetting).showNotice);

const getUnFixedAndFull = computed(() => !unref(getFixed) && !unref(getShowFullHeaderRef));

const getShowBread = computed(() => {
  return (
    unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
  );
});

const getShowHeaderLogo = computed(() => {
  return unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar);
});

const getShowContent = computed(() => {
  return unref(getShowBread) || unref(getShowHeaderTrigger);
});

// Set header configuration
function setHeaderSetting(headerSetting) {
  store.commit('app/commitProjectConfigState', { headerSetting });
}

export function useHeaderSetting() {
  return {
    setHeaderSetting,

    getHeaderSetting,

    getShowDoc,
    getShowSearch,
    getHeaderTheme,
    getUseLockPage,
    getShowFullScreen,
    getShowNotice,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull,
    getHeaderBgColor,
  };
}
