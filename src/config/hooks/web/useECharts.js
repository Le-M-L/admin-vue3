// @ts-nocheck
import { useTimeoutFn } from '@/config/hooks/core/useTimeout';
import { tryOnUnmounted } from '@vueuse/core';
import { unref, nextTick } from 'vue';
import { useDebounce } from '@/config/hooks/core/useDebounce';
import { useEventListener } from '@/config/hooks/event/useEventListener';
import { useBreakpoint } from '@/config/hooks/event/useBreakpoint';

import echarts from '@/config/plugins/echarts';

export function useECharts(elRef, theme = 'light') {
  let chartInstance = null;
  let resizeFn = resize;
  let removeResizeFn = () => {};

  const [debounceResize] = useDebounce(resize, 200);
  resizeFn = debounceResize;

  function initCharts() {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, theme);
    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn,
    });
    removeResizeFn = removeEvent;
    const { widthRef, screenEnum } = useBreakpoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn();
      }, 30);
    }
  }

  function setOptions(options, clear = true) {
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(options);
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(options);
      }, 30);
    });
  }

  function resize() {
    chartInstance?.resize();
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  return {
    setOptions,
    resize,
    echarts,
  };
}
