// @ts-nocheck
import { PageEnum } from '@/config/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/config/enums/cacheEnum';
import { useMessage } from '@/config/hooks/web/useMessage';

import router from '@/router';

import { loginApi, getUserInfoById } from '@/api/sys/user';
import { getAuthCache, setAuthCache } from '@/config/utils/auth/index';

const userStore = {
  state: {
    userInfoState: null, //用户信息
    tokenState: '', //token
    roleListState: [], //路由列表
  },
  getters: {
    getUserInfoState: (state) => state.userInfoState || getAuthCache(USER_INFO_KEY),
    getTokenState: (state) => state.tokenState || getAuthCache(TOKEN_KEY),
    getRoleListState: (state) =>
      state.roleListState > 0 ? state.roleListState : getAuthCache(ROLES_KEY),
  },
  mutations: {
    commitResetState(state) {
      state.userInfoState = null;
      state.tokenState = '';
      state.roleListState = [];
    },
    commitUserInfoState(state, info) {
      state.userInfoState = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    commitRoleListState(state, roleList) {
      state.roleListState = roleList;
      console.log(state.roleListState);
      setAuthCache(ROLES_KEY, roleList);
    },
    commitTokenState(state, info) {
      state.tokenState = info;
      setAuthCache(TOKEN_KEY, info);
    },
  },
  actions: {
    //登录
    async login(context, params) {
      let { commit, dispatch } = context;
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token, userId } = data;

        // 保存token
        commit('commitTokenState', token);

        // 获取用户信息
        const userInfo = await dispatch('getUserInfoAction', { userId });
        // const name = FULL_PAGE_NOT_FOUND_ROUTE.name;
        // name && router.removeRoute(name);
        //是否跳转到指定页面
        goHome && (await router.replace(PageEnum.BASE_HOME));
        return userInfo;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
    async getUserInfoAction(context, { userId }) {
      let { commit } = context;
      const userInfo = await getUserInfoById({ userId });
      const { roles } = userInfo;
      const roleList = roles.map((item) => item.value);
      commit('commitUserInfoState', userInfo);
      commit('commitRoleListState', roleList);
      return userInfo;
    },
    //login out
    async logout(context, goLogin = false) {
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    //退出前确认
    async confirmLoginOut(context) {
      let { dispatch } = context;
      const { createConfirm } = useMessage();
      createConfirm({
        iconType: 'warning',
        title: '温馨提醒',
        content: '是否确认退出系统?',
        onOk: async () => {
          await dispatch('loginOut', true);
        },
      });
    },
  },
};

export default userStore;
