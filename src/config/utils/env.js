// @ts-nocheck
import { warn } from '@/config/utils/log';
import pkg from '../../../package.json';
// import { getConfigFileName } from '../../../build/getConfigFileName';

export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

// 根据版本生成缓存键
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}

export function getAppEnvConfig() {
  // const ENV_NAME = getConfigFileName(process.env);

  const ENV = isDevMode()
    ? //获取全局配置(打包时将独立提取配置)
      process.env
    : process.env;

  const {
    VUE_APP_TITLE,
    VUE_APP_API_URL,
    VUE_APP_SHORT_NAME,
    VUE_APP_API_URL_PREFIX,
    VUE_APP_UPLOAD_URL,
  } = ENV;

  if (!/[a-zA-Z_]*/.test(VUE_APP_SHORT_NAME)) {
    warn(
      `VUE_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    );
  }
  return {
    VUE_APP_TITLE,
    VUE_APP_API_URL,
    VUE_APP_SHORT_NAME,
    VUE_APP_API_URL_PREFIX,
    VUE_APP_UPLOAD_URL,
  };
}

/**
 * @description: Development model
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: 获取环境变量
 * @returns:
 * @example:
 */
export function getEnv() {
  return process.env.NODE_ENV;
}
/**
 * @description: 判断是否是开发环境
 * @returns:
 * @example:
 */
export function isDevMode() {
  return getEnv() == devMode;
}
/**
 * @description: 判断是否是正式环境
 * @returns:
 * @example:
 */
export function isProdMode() {
  return getEnv() == prodMode;
}

/**
 * @description: 是否打开mock
 * @returns:
 * @example:
 */
export function isUseMock() {
  return process.env.VITE_USE_MOCK === 'true';
}
