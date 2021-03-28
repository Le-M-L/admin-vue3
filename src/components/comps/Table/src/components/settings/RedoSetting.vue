<template>
  <Tooltip placement="top">
    <template #title>
      <span>redo</span>
    </template>
    <RedoOutlined @click="redo" />
  </Tooltip>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Tooltip } from 'ant-design-vue';
  import { RedoOutlined } from '@ant-design/icons-vue';

  import { useTableContext } from '../../hooks/useTableContext';

  export default defineComponent({
    name: 'RedoSetting',
    components: {
      RedoOutlined,
      Tooltip,
    },
    setup() {
      const table = useTableContext();

      function redo() {
        table.reload();
      }

      return { redo };
    },
  });
</script>
