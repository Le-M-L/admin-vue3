import { useTimeoutFn } from '@/config/hooks/core/useTimeout';
import { unref, nextTick } from 'vue';
import { tryOnUnmounted } from '@vueuse/core';

export function useApexCharts(elRef) {
  let chartInstance = null;

  function setOptions(options, callback) {
    nextTick(() => {
      useTimeoutFn(async () => {
        const el = unref(elRef);

        if (!el || !unref(el)) return;
        //图标配置
        const ApexCharts = await (await import('apexcharts')).default;
        chartInstance = new ApexCharts(el, options);

        chartInstance && chartInstance.render();

        // The callback method is added to setOptions to return the chartInstance to facilitate the re-operation of the chart, such as calling the updateOptions method to update the chart
        callback && callback(chartInstance);
      }, 30);
    });
  }

  // Call the updateOptions method of ApexCharts to update the chart
  function updateOptions(
    chartInstance,
    options,
    redraw = false,
    animate = true,
    updateSyncedCharts = true,
    callback
  ) {
    nextTick(() => {
      useTimeoutFn(() => {
        chartInstance && chartInstance.updateOptions(options, redraw, animate, updateSyncedCharts);

        callback && callback(chartInstance);
      }, 30);
    });
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    chartInstance?.destroy?.();
    chartInstance = null;
  });

  return {
    setOptions,
    updateOptions,
  };
}
