// @ts-nocheck
import store from '@/store';
import { transformMenuModule, getAllParentPath } from '@/router/helper/menuHelper';
import { filter } from '@/config/utils/helper/treeHelper';
import { isUrl } from '@/config/utils/is';
import router from '@/router';
import { PermissionModeEnum } from '@/config/enums/appEnum';
import { pathToRegexp } from 'path-to-regexp';
import { importAll } from '@/config/utils';

const modules = importAll(require.context('./modules', true, /\.js$/));

const menuModules = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modList);
});
// ===========================
// ==========Helper===========
// ===========================
const isBackMode = () => {
  return store.getters['app/getProjectConfig'].permissionMode === PermissionModeEnum.BACK;
};

const staticMenus = [];
(() => {
  menuModules.sort((a, b) => {
    return (a.orderNo || 0) - (b.orderNo || 0);
  });

  for (const menu of menuModules) {
    console.log(menu);
    staticMenus.push(transformMenuModule(menu));
  }
})();

async function getAsyncMenus() {
  // 前端角色控制菜单 直接取菜单文件
  return !isBackMode() ? staticMenus : store.getters['permission/getBackMenuListState'];
}
// 获取菜单 树级
export const getMenus = async () => {
  const menus = await getAsyncMenus();
  const routes = router.getRoutes();

  return !isBackMode() ? filter(menus, basicFilter(routes)) : menus;
};
// 获取当前路径的顶级路径
export async function getCurrentParentPath(currentPath) {
  const menus = await getAsyncMenus();

  const allParentPath = await getAllParentPath(menus, currentPath);

  return allParentPath?.[0];
}

// 获取1级菜单，删除children
export async function getShallowMenus() {
  const menus = await getAsyncMenus();
  const routes = router.getRoutes();
  const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }));
  return !isBackMode() ? shallowMenuList.filter(basicFilter(routes)) : shallowMenuList;
}

// 获取菜单的子菜单
export async function getChildrenMenus(parentPath) {
  const menus = await getMenus();
  const parent = menus.find((item) => item.path === parentPath);
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) return [];
  const routes = router.getRoutes();

  return !isBackMode() ? filter(parent.children, basicFilter(routes)) : parent.children;
}
// 通用过滤方法
function basicFilter(routes) {
  return (menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true;

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path);
      }
      const isSame = route.path === menu.path;
      if (!isSame) return false;

      if (route.meta?.ignoreAuth) return true;

      return isSame || pathToRegexp(route.path).test(menu.path);
    });

    if (!matchRoute) return false;
    menu.icon = menu.icon || matchRoute.meta.icon;
    menu.meta = matchRoute.meta;
    return true;
  };
}
