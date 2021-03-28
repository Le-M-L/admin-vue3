// @ts-nocheck
//导入时间格式化
import { formatToDateTime } from '@/config/utils/dateUtil';
import { ErrorTypeEnum } from '@/config/enums/exceptionEnum';
import projectSetting from '@/config/settings/projectSetting';

export default {
  state: {
    errorInfoState: [], // 错误列表
    errorListCountState: 0, // 错误数量
  },
  getters: {
    getErrorInfoState: (state) => state.errorInfoState,
    getErrorListCountState: (state) => state.getErrorListCountState,
  },
  methods: {
    commitErrorInfoState(state, info) {
      const item = {
        ...info,
        time: formatToDateTime(new Date()),
      };
      state.errorInfoState = [item, ...state.errorInfoState];
      state.errorListCountState += 1;
    },
    commitErrorListCountState(state, count) {
      state.errorListCountState = count;
    },
  },
  actions: {
    setupErrorHandle(context, error) {
      let { commit } = context;
      const { useErrorHandle } = projectSetting;
      if (!useErrorHandle) return;
      const errInfo = {
        message: error.message,
        type: ErrorTypeEnum.AJAX,
      };
      if (error.response) {
        const {
          config: { url = '', data: params = '', method = 'get', headers = {} } = {},
          data = {},
        } = error.response;
        errInfo.url = url;
        errInfo.name = 'Ajax Error!';
        errInfo.file = '-';
        errInfo.stack = JSON.stringify(data);
        errInfo.detail = JSON.stringify({ params, method, headers });
      }
      commit('commitErrorInfoState', errInfo);
    },
  },
};
