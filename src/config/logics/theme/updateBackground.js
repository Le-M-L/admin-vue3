// @ts-nocheck
import { isHexColor, colorIsDark, lighten, darken } from '@/config/utils/color';
import store from '@/store';
import { ThemeEnum } from '@/config/enums/appEnum';
import { setCssVar } from './util';

const HEADER_BG_COLOR_VAR = '--header-bg-color';
const HEADER_BG_HOVER_COLOR_VAR = '--header-bg-hover-color';
const HEADER_MENU_ACTIVE_BG_COLOR_VAR = '--header-active-menu-bg-color';

const SIDER_DARK_BG_COLOR = '--sider-dark-bg-color';
const SIDER_DARK_DARKEN_BG_COLOR = '--sider-dark-darken-bg-color';
const SIDER_LIGHTEN_1_BG_COLOR = '--sider-dark-lighten-1-bg-color';
const SIDER_LIGHTEN_2_BG_COLOR = '--sider-dark-lighten-2-bg-color';

/**
 * 更改顶部标题的背景颜色
 * @param color
 */
export function updateHeaderBgColor(color) {
  if (!isHexColor(color)) return;
  // bg color
  setCssVar(HEADER_BG_COLOR_VAR, color);

  // hover color
  const hoverColor = lighten(color, 6);
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
  setCssVar(HEADER_MENU_ACTIVE_BG_COLOR_VAR, hoverColor);

  // 确定颜色值的深度并自动切换主题
  const isDark = colorIsDark(color);

  store.commit('app/commitProjectConfigState', {
    headerSetting: {
      theme: isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT,
    },
  });
}

/**
 * 改变左侧菜单的背景颜色
 * @param color  bg color
 */
export function updateSidebarBgColor(color) {
  if (!isHexColor(color)) return;

  setCssVar(SIDER_DARK_BG_COLOR, color);
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color, 6));
  setCssVar(SIDER_LIGHTEN_1_BG_COLOR, lighten(color, 5));
  setCssVar(SIDER_LIGHTEN_2_BG_COLOR, lighten(color, 8));

  // only #ffffff is light
  // Only when the background color is #fff, the theme of the menu will be changed to light
  const isLight = ['#fff', '#ffffff'].includes(color.toLowerCase());
  store.commit('app/commitProjectConfigState', {
    menuSetting: {
      theme: isLight ? ThemeEnum.LIGHT : ThemeEnum.DARK,
    },
  });
}
