// @ts-nocheck

import { computed, unref, ref } from 'vue';

import store from '@/store';

import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@/config/enums/appEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '@/config/enums/menuEnum';
import { useFullContent } from '@/config/hooks/web/useFullContent';

const mixSideHasChildren = ref(false);

// 获取菜单配置
const getMenuSetting = computed(() => store.getters['app/getProjectConfig'].menuSetting);
// 是否收起菜单
const getCollapsed = computed(() => unref(getMenuSetting).collapsed);
// 菜单类型
const getMenuType = computed(() => unref(getMenuSetting).type);
// 菜单模式
const getMenuMode = computed(() => unref(getMenuSetting).mode);
// 是否固定菜单
const getMenuFixed = computed(() => unref(getMenuSetting).fixed);
// 是否不显示dom
const getShowMenu = computed(() => unref(getMenuSetting).show);
// 是否显示dom
const getMenuHidden = computed(() => unref(getMenuSetting).hidden);
// 菜单宽度
const getMenuWidth = computed(() => unref(getMenuSetting).menuWidth);
// 折叠触发
const getTrigger = computed(() => unref(getMenuSetting).trigger);
// 菜单主题
const getMenuTheme = computed(() => unref(getMenuSetting).theme);
// 拆分菜单
const getSplit = computed(() => unref(getMenuSetting).split);
// 侧边栏菜单bg颜色
const getMenuBgColor = computed(() => unref(getMenuSetting).bgColor);
// 模块打开方法' click ' |'hover'
const getMixSideTrigger = computed(() => unref(getMenuSetting).mixSideTrigger);
// 是否可以拖 仅限打开左侧菜单时，鼠标在右侧菜单上有一个拖动条
const getCanDrag = computed(() => unref(getMenuSetting).canDrag);
// 手风琴模式  只显示一个菜单
const getAccordion = computed(() => unref(getMenuSetting).accordion);
// 固定扩展菜单
const getMixSideFixed = computed(() => unref(getMenuSetting).mixSideFixed);
// 顶部菜单布局
const getTopMenuAlign = computed(() => unref(getMenuSetting).topMenuAlign);
// 切换页面到关闭菜单
const getCloseMixSidebarOnChange = computed(() => unref(getMenuSetting).closeMixSidebarOnChange);
// 侧边栏模式
const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);
//顶部导航栏模式
const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);
// 折叠菜单时是否显示菜单名称
const getCollapsedShowTitle = computed(() => unref(getMenuSetting).collapsedShowTitle);

const getShowTopMenu = computed(() => {
  return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit);
});

const getShowHeaderTrigger = computed(() => {
  if (unref(getMenuType) === MenuTypeEnum.TOP_MENU || !unref(getShowMenu) || unref(getMenuHidden)) {
    return false;
  }

  return unref(getTrigger) === TriggerEnum.HEADER;
});
//是否为水平模式
const getIsHorizontal = computed(() => {
  return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
});

const getIsMixSidebar = computed(() => {
  return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
});

const getIsMixMode = computed(() => {
  return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
});

const getRealWidth = computed(() => {
  if (unref(getIsMixSidebar)) {
    return unref(getCollapsed) && !unref(getMixSideFixed)
      ? unref(getMiniWidthNumber)
      : unref(getMenuWidth);
  }
  return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth);
});

const getMiniWidthNumber = computed(() => {
  const { collapsedShowTitle } = unref(getMenuSetting);
  return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH;
});

const getCalcContentWidth = computed(() => {
  const width =
    unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
      ? 0
      : unref(getIsMixSidebar)
      ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
        (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
      : unref(getRealWidth);

  return `calc(100% - ${unref(width)}px)`;
});

const { getFullContent: fullContent } = useFullContent();

const getShowSidebar = computed(() => {
  return (
    unref(getSplit) ||
    (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
  );
});

// 设置菜单配置
function setMenuSetting(menuSetting) {
  store.commit('app/commitProjectConfigState', { menuSetting });
}

function toggleCollapsed() {
  setMenuSetting({
    collapsed: !unref(getCollapsed),
  });
}

export function useMenuSetting() {
  return {
    setMenuSetting,

    toggleCollapsed,

    getMenuFixed,
    getMenuSetting,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getTrigger,
    getSplit,
    getMenuTheme,
    getCanDrag,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getShowHeaderTrigger,
    getTopMenuAlign,
    getMenuHidden,
    getIsTopMenu,
    getMenuBgColor,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,
    getCloseMixSidebarOnChange,
    getMixSideTrigger,
    getMixSideFixed,
    mixSideHasChildren,
  };
}
