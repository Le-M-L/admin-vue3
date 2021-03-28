<template>
  <Tooltip title="redo" placement="bottom" :mouseEnterDelay="0.5">
    <span :class="`${prefixCls}__extra-redo`" @click="handleRedo">
      <RedoOutlined :spin="loading" />
    </span>
  </Tooltip>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { Tooltip } from 'ant-design-vue';
  import { useTabs } from '@/config/hooks/web/useTabs';

  export default defineComponent({
    name: 'TabRedo',
    components: { RedoOutlined, Tooltip },

    setup() {
      const loading = ref(false);
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { refreshPage } = useTabs();

      async function handleRedo() {
        loading.value = true;
        await refreshPage();
        setTimeout(() => {
          loading.value = false;
          // Animation execution time
        }, 1000);
      }
      return { prefixCls, handleRedo, loading };
    },
  });
</script>
