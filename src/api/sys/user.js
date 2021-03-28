import { defHttp } from '@/config/utils/http/axios';

const Api = {
  Login: '/login',
  GetUserInfoById: '/getUserInfoById',
  GetPermCodeByUserId: '/getPermCodeByUserId',
};

/**
 * @description: user login api
 */
export function loginApi(params, mode = 'modal') {
  return defHttp.post(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * @description: getUserInfoById
 */
export function getUserInfoById(params) {
  return defHttp.post({
    url: Api.GetUserInfoById,
    params,
  });
}

export function getPermCodeByUserId(params) {
  return defHttp.get({
    url: Api.GetPermCodeByUserId,
    params,
  });
}
