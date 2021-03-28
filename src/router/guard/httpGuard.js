// @ts-nocheck
import { AxiosCanceler } from '@/config/utils/http/axios/axiosCancel';
import projectSetting from '@/config/settings/projectSetting';

/**
 * 切换路由时关闭当前页面以完成请求的接口
 * @param router
 */
export function createHttpGuard(router) {
  const { removeAllHttpPending } = projectSetting;
  let axiosCanceler;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(async () => {
    // 切换路由将删除之前的请求
    removeAllHttpPending && axiosCanceler?.removeAllPending();
    return true;
  });
}
