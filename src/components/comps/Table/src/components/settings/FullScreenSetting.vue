<template>
  <Tooltip placement="top">
    <template #title>
      <span>settingFullScreen</span>
    </template>
    <FullscreenOutlined @click="toggleFullscreen" v-if="!isFullscreenRef" />
    <FullscreenExitOutlined @click="toggleFullscreen" v-else />
  </Tooltip>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';

  import { useFullscreen } from '@/config/hooks/web/useFullScreen';
  import { useTableContext } from '../../hooks/useTableContext';

  export default defineComponent({
    name: 'FullScreenSetting',
    components: {
      FullscreenExitOutlined,
      FullscreenOutlined,
      Tooltip,
    },

    setup() {
      const table = useTableContext();
      const { toggleFullscreen, isFullscreenRef } = useFullscreen(table.wrapRef);

      return {
        toggleFullscreen,
        isFullscreenRef,
      };
    },
  });
</script>
