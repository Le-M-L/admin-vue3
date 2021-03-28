import { defHttp } from '@/config/utils/http/axios';

const Api = {
  GetMenuListById: '/getMenuListById',
};

/**
 * @description: Get user menu based on id
 */

export const getMenuListById = (params) => {
  return defHttp.get({ url: Api.GetMenuListById, params });
};
