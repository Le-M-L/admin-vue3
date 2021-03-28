// @ts-nocheck
import { ref, computed, unref } from 'vue';
import { createPageContext } from '@/config/hooks/component/usePageContext';
import { useWindowSizeFn } from '@/config/hooks/event/useWindowSizeFn';
export const headerHeightRef = ref(0);

export function useContentViewHeight() {
  const contentHeight = ref(window.innerHeight);
  const pageHeight = ref(window.innerHeight);
  const getViewHeight = computed(() => {
    return unref(contentHeight) - unref(headerHeightRef) || 0;
  });

  useWindowSizeFn(
    () => {
      contentHeight.value = window.innerHeight;
    },
    100,
    { immediate: true }
  );

  async function setPageHeight(height) {
    pageHeight.value = height;
  }

  createPageContext({
    contentHeight: getViewHeight,
    setPageHeight,
    pageHeight,
  });
}
