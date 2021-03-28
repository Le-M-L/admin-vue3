<template>
  <Tooltip :title="getTitle" placement="bottom" :mouseEnterDelay="0.5">
    <span @click="toggleFullscreen">
      <FullscreenOutlined v-if="!isFullscreen" />
      <FullscreenExitOutlined v-else />
    </span>
  </Tooltip>
</template>
<script>
  import { defineComponent, computed, unref } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { useFullscreen } from '@/config/hooks/web/useFullScreen';
  import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'FullScreen',
    components: { FullscreenExitOutlined, FullscreenOutlined, Tooltip },

    setup() {
      const { toggleFullscreen, isFullscreenRef } = useFullscreen();

      const getTitle = computed(() => {
        return unref(isFullscreenRef) ? 'tooltipExitFull' : 'tooltipEntryFull';
      });

      return {
        getTitle,
        isFullscreen: isFullscreenRef,
        toggleFullscreen,
      };
    },
  });
</script>
