import {
  // throttle,
  useThrottle,
} from './useThrottle';

/**
 * @description: 适用于组件
 */
export function useDebounce(handle, wait, options = {}) {
  return useThrottle(
    handle,
    wait,
    Object.assign(options, {
      debounce: true,
    })
  );
}
