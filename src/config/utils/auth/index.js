// @ts-nocheck
import { Persistent } from '@/config/utils/cache/persistent';
import { CacheTypeEnum } from '@/config/enums/cacheEnum';
import projectSetting from '@/config/settings/projectSetting';
import { TOKEN_KEY } from '@/config/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache(key) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key);
}

export function setAuthCache(key, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}
