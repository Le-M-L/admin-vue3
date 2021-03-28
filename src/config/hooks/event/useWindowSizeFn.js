// @ts-nocheck
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';
import { useDebounce } from '@/config/hooks/core/useDebounce';

export function useWindowSizeFn(fn, wait = 150, options) {
  let handler = () => {
    fn();
  };
  const [handleSize, cancel] = useDebounce(handler, wait, options);
  handler = handleSize;

  const start = () => {
    if (options && options.immediate) {
      handler();
    }
    window.addEventListener('resize', handler);
  };

  const stop = () => {
    window.removeEventListener('resize', handler);
    cancel();
  };

  tryOnMounted(() => {
    start();
  });

  tryOnUnmounted(() => {
    stop();
  });
  return [start, stop];
}
