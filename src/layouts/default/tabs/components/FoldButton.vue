<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <FullscreenExitOutlined v-if="getIsUnFold" />
    <FullscreenOutlined v-else />
  </span>
</template>
<script>
  import { defineComponent, unref, computed } from 'vue';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { useHeaderSetting } from '@/config/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '@/config/hooks/setting/useMenuSetting';
  import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'FoldButton',
    components: { FullscreenOutlined, FullscreenExitOutlined },

    setup() {
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { getShowMenu, setMenuSetting } = useMenuSetting();
      const { getShowHeader, setHeaderSetting } = useHeaderSetting();

      const getIsUnFold = computed(() => {
        return !unref(getShowMenu) && !unref(getShowHeader);
      });

      function handleFold() {
        const isScale = !unref(getShowMenu) && !unref(getShowHeader);
        setMenuSetting({
          show: isScale,
          hidden: !isScale,
        });
        setHeaderSetting({
          show: isScale,
        });
      }

      return { prefixCls, handleFold, getIsUnFold };
    },
  });
</script>
