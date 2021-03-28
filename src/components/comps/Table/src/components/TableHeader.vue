<template>
  <slot name="tableTitle" v-if="$slots.tableTitle"></slot>

  <TableTitle :helpMessage="titleHelpMessage" :title="title" v-if="!$slots.tableTitle && title" />

  <div :class="`${prefixCls}__toolbar`">
    <slot name="toolbar"></slot>
    <Divider type="vertical" v-if="$slots.toolbar && showTableSetting" />
    <TableSetting :setting="tableSetting" v-if="showTableSetting" />
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Divider } from 'ant-design-vue';
  import TableSettingComponent from './settings/index.vue';
  import TableTitle from './TableTitle.vue';

  import { useDesign } from '@/config/hooks/web/useDesign';

  export default defineComponent({
    name: 'BasicTableHeader',
    components: {
      Divider,
      TableTitle,
      TableSetting: TableSettingComponent,
    },
    props: {
      title: {
        type: [Function, String],
      },
      tableSetting: {
        type: Object,
      },
      showTableSetting: {
        type: Boolean,
      },
      titleHelpMessage: {
        type: [String, Array],
        default: '',
      },
    },
    setup() {
      const { prefixCls } = useDesign('basic-table-header');
      return { prefixCls };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-table-header';

  .@{prefix-cls} {
    &__toolbar {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      > * {
        margin-right: 8px;
      }
    }
  }
</style>
