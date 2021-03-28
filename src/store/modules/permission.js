// @ts-nocheck

import { toRaw } from 'vue';

import { PermissionModeEnum } from '@/config/enums/appEnum';

import projectSetting from '@/config/settings/projectSetting';

import { asyncRoutes } from '@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { transformObjToRoute, flatMultiLevelRoutes } from '@/router/helper/routeHelper';
import { transformRouteToMenu } from '@/router/helper/menuHelper';

import { filter } from '@/config/utils/helper/treeHelper';

// import { getMenuListById } from '@/api/sys/menu';
const getMenuListById = () => {};

import { getPermCodeByUserId } from '@/api/sys/user';

import { useMessage } from '@/config/hooks/web/useMessage';

export default {
  state: {
    //许可码列表
    permCodeListState: [],
    //路由是否被动态添加
    isDynamicAddedRouteState: false,
    //触发菜单更新
    lastBuildMenuTimeState: 0,
    //后台菜单列表
    backMenuListState: [],
  },
  getters: {
    getPermCodeListState: (state) => state.permCodeListState,
    getBackMenuListState: (state) => state.backMenuListState, //动态菜单
    getLastBuildMenuTimeState: (state) => state.lastBuildMenuTimeState,
    getIsDynamicAddedRouteState: (state) => state.isDynamicAddedRouteState,
  },
  mutations: {
    commitPermCodeListState: (state, codeList) => (state.permCodeListState = codeList),
    commitBackMenuListState: (state, list) => (state.backMenuListState = list),
    commitLastBuildMenuTimeState: (state) => (state.lastBuildMenuTimeState = new Date().getTime()),
    commitDynamicAddedRouteState: (state, added) => (state.isDynamicAddedRouteState = added),
    commitResetState: (state) => {
      state.isDynamicAddedRouteState = false;
      state.permCodeListState = [];
      state.backMenuListState = [];
      state.lastBuildMenuTimeState = 0;
    },
  },
  actions: {
    async changePermissionCode(context, userId) {
      const { commit } = context;
      const codeList = await getPermCodeByUserId({ userId });
      commit('commitPermCodeListState', codeList);
    },
    async buildRoutesAction(context, id) {
      let { rootGetters } = context;
      let routes = [];
      //获取角色列表
      const roleList = toRaw(rootGetters['user/getRoleListState']);
      //获取权限模块配置
      const { permissionMode = projectSetting.permissionMode } = rootGetters[
        'app/getProjectConfig'
      ];
      //角色权限申请
      if (permissionMode === PermissionModeEnum.ROLE) {
        const routeFilter = (route) => {
          const { meta } = route;
          const { roles } = meta || {};
          if (!roles) return true;
          return roleList.some((role) => roles.includes(role));
        };
        routes = filter(asyncRoutes, routeFilter);
        routes = routes.filter(routeFilter);
        //转换多级路由到级别2路由
        routes = flatMultiLevelRoutes(routes);

        //  如果确定不需要做后台动态权限,请将下面整个判断注释
      } else if (permissionMode === PermissionModeEnum.BACK) {
        const { createMessage } = useMessage();
        createMessage.loading({
          content: '菜单加载中',
          duration: 1,
        });
        // 这里获取后台路由菜单逻辑自行修改
        const paramId = id || rootGetters['user/getUserInfoState'].userId;
        // !模拟从后台获取权限代码，
        //这个函数可能只需要执行一次，实际的项目可以自己在正确的时间放置
        try {
          context.commit('changePermissionCode', '1');
        } catch (error) {
          console.log(error);
        }

        if (!paramId) {
          throw new Error('paramId is undefined!');
        }

        //请求 获取列表
        let routeList = await getMenuListById({ id: paramId });

        // 动态引入组件
        routeList = transformObjToRoute(routeList);
        //  后台路由转菜单结构
        const backMenuList = transformRouteToMenu(routeList);
        context.commit('commitBackMenuListState', backMenuList);
        routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
      }
      routes.push(ERROR_LOG_ROUTE);
      return routes;
    },
  },
};
