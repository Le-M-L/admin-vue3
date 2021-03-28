<template>
  <div class="table-settings">
    <RedoSetting v-if="getSetting.redo" />
    <SizeSetting v-if="getSetting.size" />
    <ColumnSetting v-if="getSetting.setting" />
    <FullScreenSetting v-if="getSetting.fullScreen" />
  </div>
</template>
<script>
  import { defineComponent, computed } from 'vue';

  import ColumnSetting from './ColumnSetting.vue';
  import SizeSetting from './SizeSetting.vue';
  import RedoSetting from './RedoSetting.vue';
  import FullScreenSetting from './FullScreenSetting.vue';

  export default defineComponent({
    name: 'TableSetting',
    components: {
      ColumnSetting,
      SizeSetting,
      RedoSetting,
      FullScreenSetting,
    },
    props: {
      setting: {
        type: Object,
        default: () => {},
      },
    },
    setup(props) {
      const getSetting = computed(() => {
        return {
          redo: true,
          size: true,
          setting: true,
          fullScreen: false,
          ...props.setting,
        };
      });

      return { getSetting };
    },
  });
</script>
<style lang="less">
  .table-settings {
    & > * {
      margin-right: 12px;
    }

    svg {
      width: 1.3em;
      height: 1.3em;
    }
  }
</style>
