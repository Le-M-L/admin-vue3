// @ts-nocheck
import { ContentEnum, RouterTransitionEnum } from '@/config/enums/appEnum';
import {
  MenuModeEnum,
  MenuTypeEnum,
  TopMenuAlignEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '@/config/enums/menuEnum';

export const HandlerEnum = {
  CHANGE_LAYOUT: 0,
  CHANGE_THEME_COLOR: 1,
  // menu
  MENU_HAS_DRAG: 2,
  MENU_ACCORDION: 3,
  MENU_TRIGGER: 4,
  MENU_TOP_ALIGN: 5,
  MENU_COLLAPSED: 6,
  MENU_COLLAPSED_SHOW_TITLE: 7,
  MENU_WIDTH: 8,
  MENU_SHOW_SIDEBAR: 9,
  MENU_THEME: 10,
  MENU_SPLIT: 11,
  MENU_FIXED: 12,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE: 13,
  MENU_TRIGGER_MIX_SIDEBAR: 14,
  MENU_FIXED_MIX_SIDEBAR: 15,

  // header
  HEADER_SHOW: 16,
  HEADER_THEME: 17,
  HEADER_FIXED: 18,

  HEADER_SEARCH: 19,

  TABS_SHOW_QUICK: 20,
  TABS_SHOW_REDO: 21,
  TABS_SHOW: 22,
  TABS_SHOW_FOLD: 23,

  LOCK_TIME: 24,
  FULL_CONTENT: 25,
  CONTENT_MODE: 26,
  SHOW_BREADCRUMB: 27,
  SHOW_BREADCRUMB_ICON: 28,
  GRAY_MODE: 29,
  COLOR_WEAK: 30,
  SHOW_LOGO: 31,
  SHOW_FOOTER: 32,

  ROUTER_TRANSITION: 33,
  OPEN_PROGRESS: 34,
  OPEN_PAGE_LOADING: 35,
  OPEN_ROUTE_TRANSITION: 36,
};

export const contentModeOptions = [
  {
    value: ContentEnum.FULL,
    label: '流式',
  },
  {
    value: ContentEnum.FIXED,
    label: '顶宽',
  },
];

export const topMenuAlignOptions = [
  {
    value: TopMenuAlignEnum.CENTER,
    label: '居右',
  },
  {
    value: TopMenuAlignEnum.START,
    label: '居左',
  },
  {
    value: TopMenuAlignEnum.END,
    label: '居中',
  },
];

export const getMenuTriggerOptions = (hideTop) => {
  return [
    {
      value: TriggerEnum.NONE,
      label: '不显示',
    },
    {
      value: TriggerEnum.FOOTER,
      label: '底部',
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: '顶部',
          },
        ]),
  ];
};

export const routerTransitionOptions = [
  RouterTransitionEnum.ZOOM_FADE,
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.ZOOM_OUT,
  RouterTransitionEnum.FADE_SIDE,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE,
].map((item) => {
  return {
    label: item,
    value: item,
  };
});

export const menuTypeList = [
  {
    title: '左侧菜单模式',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
  },
  {
    title: '顶部菜单混合模式',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX,
  },

  {
    title: '顶部菜单模式',
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.TOP_MENU,
  },
  {
    title: '左侧菜单混合模式',
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_SIDEBAR,
  },
];

export const mixSidebarTriggerOptions = [
  {
    value: MixSidebarTriggerEnum.HOVER,
    label: '悬停',
  },
  {
    value: MixSidebarTriggerEnum.CLICK,
    label: '点击',
  },
];
