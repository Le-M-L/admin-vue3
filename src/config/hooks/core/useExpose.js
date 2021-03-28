import { getCurrentInstance } from 'vue';

// 公开的公共api
export function useExpose(apis) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy, apis);
  }
}
