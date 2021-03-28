// @ts-nocheck
import { LOCK_INFO_KEY } from '@/config/enums/cacheEnum';
import { Persistent } from '@/config/utils/cache/persistent';
export default {
  state: {
    //锁屏信息
    lockInfoState: Persistent.getLocal(LOCK_INFO_KEY),
  },
  getters: {
    getLockInfo: (state) => state.lockInfoState || {},
  },
  mutations: {
    commitLockInfoState(state, info) {
      state.lockInfoState = Object.assign({}, state.lockInfoState, info);
      Persistent.setLocal(LOCK_INFO_KEY, state.lockInfoState);
    },
    resetLockInfo(state) {
      Persistent.removeLocal(LOCK_INFO_KEY);
      state.lockInfoState = null;
    },
  },
  actions: {
    //开锁
    async unLockAction(context, { password }) {
      let { rootGetters, commit } = context;
      const tryLogin = async () => {
        try {
          const username = rootGetters['user/getUserInfoState'].username;
          const res = await commit(
            'user/login',
            { username, password, goHome: false, mode: 'none' },
            { root: true }
          );
          if (res) {
            commit('resetLockInfo');
          }
          return res;
        } catch (error) {
          return false;
        }
      };

      if (this.getLockInfo?.pwd === password) {
        commit('resetLockInfo');
        return true;
      }
      return await tryLogin();
    },
  },
};
