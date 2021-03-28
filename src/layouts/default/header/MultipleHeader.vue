<template>
  <div :style="getPlaceholderDomStyle" v-if="getIsShowPlaceholderDom"></div>
  <div :style="getWrapStyle" :class="getClass">
    <LayoutHeader v-if="getShowInsetHeaderRef" />
    <MultipleTabs v-if="getShowTabs" />
  </div>
</template>
<script>
  import { defineComponent, unref, computed } from 'vue';

  import LayoutHeader from './index.vue';
  import MultipleTabs from '../tabs/index.vue';

  import { useHeaderSetting } from '@/config/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '@/config/hooks/setting/useMenuSetting';
  import { useFullContent } from '@/config/hooks/web/useFullContent';
  import { useMultipleTabSetting } from '@/config/hooks/setting/useMultipleTabSetting';
  import { useAppInject } from '@/config/hooks/web/useAppInject';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { headerHeightRef } from '../content/useContentViewHeight';

  const HEADER_HEIGHT = 48;

  const TABS_HEIGHT = 32;
  export default defineComponent({
    name: 'LayoutMultipleHeader',
    components: { LayoutHeader, MultipleTabs },
    setup() {
      const { prefixCls } = useDesign('layout-multiple-header');

      const { getCalcContentWidth, getSplit } = useMenuSetting();
      const { getIsMobile } = useAppInject();
      const {
        getFixed,
        getShowInsetHeaderRef,
        getShowFullHeaderRef,
        getHeaderTheme,
        getShowHeader,
      } = useHeaderSetting();

      const { getFullContent } = useFullContent();

      const { getShowMultipleTab } = useMultipleTabSetting();

      const getShowTabs = computed(() => {
        return unref(getShowMultipleTab) && !unref(getFullContent);
      });

      const getIsShowPlaceholderDom = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef);
      });

      const getWrapStyle = computed(() => {
        const style = {};
        if (unref(getFixed)) {
          style.width = unref(getIsMobile) ? '100%' : unref(getCalcContentWidth);
        }
        if (unref(getShowFullHeaderRef)) {
          style.top = `${HEADER_HEIGHT}px`;
        }
        return style;
      });

      const getIsFixed = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef);
      });

      const getPlaceholderDomStyle = computed(() => {
        let height = 0;
        if (
          (unref(getShowFullHeaderRef) || !unref(getSplit)) &&
          unref(getShowHeader) &&
          !unref(getFullContent)
        ) {
          height += HEADER_HEIGHT;
        }
        if (unref(getShowMultipleTab) && !unref(getFullContent)) {
          height += TABS_HEIGHT;
        }
        headerHeightRef.value = height;
        return {
          height: `${height}px`,
        };
      });

      const getClass = computed(() => {
        return [
          prefixCls,
          `${prefixCls}--${unref(getHeaderTheme)}`,
          { [`${prefixCls}--fixed`]: unref(getIsFixed) },
        ];
      });

      return {
        getClass,
        prefixCls,
        getPlaceholderDomStyle,
        getIsFixed,
        getWrapStyle,
        getIsShowPlaceholderDom,
        getShowTabs,
        getShowInsetHeaderRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-multiple-header';

  .@{prefix-cls} {
    // margin-left: 1px;
    transition: width 0.2s;
    flex: 0 0 auto;

    &--dark {
      margin-left: 0;
    }

    &--fixed {
      position: fixed;
      top: 0;
      z-index: @multiple-tab-fixed-z-index;
      width: 100%;
    }
  }
</style>
