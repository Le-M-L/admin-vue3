<template>
  <Tooltip placement="top">
    <template #title>
      <span>列设置</span>
    </template>
    <Popover
      placement="bottomLeft"
      trigger="click"
      @visibleChange="handleVisibleChange"
      :overlayClassName="`${prefixCls}__cloumn-list`"
    >
      <template #title>
        <div :class="`${prefixCls}__popover-title`">
          <Checkbox
            :indeterminate="indeterminate"
            v-model:checked="checkAll"
            @change="onCheckAllChange"
          >
            列展示
          </Checkbox>

          <Checkbox v-model:checked="checkIndex" @change="handleIndexCheckChange">
            序号列
          </Checkbox>

          <Checkbox
            v-model:checked="checkSelect"
            @change="handleSelectCheckChange"
            :disabled="!defaultRowSelection"
          >
            勾选列
          </Checkbox>

          <a-button size="small" type="link" @click="reset"> 重置 </a-button>
        </div>
      </template>

      <template #content>
        <ScrollContainer>
          <CheckboxGroup v-model:value="checkedList" @change="onChange" ref="columnListRef">
            <template v-for="item in plainOptions" :key="item.value">
              <div :class="`${prefixCls}__check-item`">
                <DragOutlined class="table-coulmn-drag-icon" />
                <Checkbox :value="item.value">
                  {{ item.label }}
                </Checkbox>

                <Tooltip placement="bottomLeft" :mouseLeaveDelay="0.4">
                  <template #title> 固定到左侧 </template>

                  <LeftOutlined
                    :class="[
                      `${prefixCls}__fixed-left`,
                      {
                        active: item.fixed === 'left',
                        disabled: !checkedList.includes(item.value),
                      },
                    ]"
                    @click="handleColumnFixed(item, 'left')"
                  />
                </Tooltip>
                <Divider type="vertical" />
                <Tooltip placement="bottomLeft" :mouseLeaveDelay="0.4">
                  <template #title> 固定到右侧 </template>

                  <LeftOutlined
                    :class="[
                      `${prefixCls}__fixed-right`,
                      {
                        active: item.fixed === 'right',
                        disabled: !checkedList.includes(item.value),
                      },
                    ]"
                    @click="handleColumnFixed(item, 'right')"
                  />
                </Tooltip>
              </div>
            </template>
          </CheckboxGroup>
        </ScrollContainer>
      </template>
      <SettingOutlined />
    </Popover>
  </Tooltip>
</template>
<script>
  import {
    defineComponent,
    ref,
    reactive,
    toRefs,
    watchEffect,
    nextTick,
    unref,
    computed,
  } from 'vue';
  import { Tooltip, Popover, Checkbox, Divider } from 'ant-design-vue';
  import { SettingOutlined, DragOutlined, LeftOutlined } from '@ant-design/icons-vue';
  import { ScrollContainer } from '@/components/comps/Container';

  import { useTableContext } from '../../hooks/useTableContext';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { useSortable } from '@/config/hooks/web/useSortable';

  import { isNullAndUnDef } from '@/config/utils/is';
  import { getPopupContainer } from '@/config/utils';
  import { omit } from 'lodash-es';

  export default defineComponent({
    name: 'ColumnSetting',
    components: {
      SettingOutlined,
      Popover,
      Tooltip,
      Checkbox,
      CheckboxGroup: Checkbox.Group,
      DragOutlined,
      ScrollContainer,
      Divider,
      LeftOutlined,
    },

    setup() {
      const table = useTableContext();

      const defaultRowSelection = omit(table.getRowSelection(), 'selectedRowKeys');
      let inited = false;

      const cachePlainOptions = ref([]);
      const plainOptions = ref([]);

      const plainSortOptions = ref([]);

      const columnListRef = ref(null);

      const state = reactive({
        indeterminate: false,
        checkAll: true,
        checkedList: [],
        defaultCheckList: [],
      });

      const checkIndex = ref(false);
      const checkSelect = ref(false);

      const { prefixCls } = useDesign('basic-column-setting');

      const getValues = computed(() => {
        return unref(table?.getBindValues) || {};
      });

      watchEffect(() => {
        const columns = table.getColumns();
        if (columns.length) {
          init();
        }
      });

      watchEffect(() => {
        const values = unref(getValues);
        checkIndex.value = !!values.showIndexColumn;
        checkSelect.value = !!values.rowSelection;
      });

      function getColumns() {
        const ret = [];
        table.getColumns({ ignoreIndex: true, ignoreAction: true }).forEach((item) => {
          ret.push({
            label: item.title || item.customTitle,
            value: item.dataIndex || item.title,
            ...item,
          });
        });
        return ret;
      }

      function init() {
        const columns = getColumns();

        const checkList = table
          .getColumns()
          .map((item) => {
            if (item.defaultHidden) {
              return '';
            }
            return item.dataIndex || item.title;
          })
          .filter(Boolean);

        if (!plainOptions.value.length) {
          plainOptions.value = columns;
          plainSortOptions.value = columns;
          cachePlainOptions.value = columns;
          state.defaultCheckList = checkList;
        } else {
          // const fixedColumns = columns.filter((item) =>
          //   Reflect.has(item, 'fixed')
          // ) as BasicColumn[];

          unref(plainOptions).forEach((item) => {
            const findItem = columns.find((col) => col.dataIndex === item.dataIndex);
            if (findItem) {
              item.fixed = findItem.fixed;
            }
          });
        }
        state.checkedList = checkList;
      }

      // checkAll change
      function onCheckAllChange(e) {
        state.indeterminate = false;
        const checkList = plainOptions.value.map((item) => item.value);
        if (e.target.checked) {
          state.checkedList = checkList;
          table.setColumns(checkList);
        } else {
          state.checkedList = [];
          table.setColumns([]);
        }
      }

      // Trigger when check/uncheck a column
      function onChange(checkedList) {
        const len = plainOptions.value.length;
        state.indeterminate = !!checkedList.length && checkedList.length < len;
        state.checkAll = checkedList.length === len;

        const sortList = unref(plainSortOptions).map((item) => item.value);
        checkedList.sort((prev, next) => {
          return sortList.indexOf(prev) - sortList.indexOf(next);
        });
        table.setColumns(checkedList);
      }

      // reset columns
      function reset() {
        state.checkedList = [...state.defaultCheckList];
        state.checkAll = true;
        state.indeterminate = false;
        plainOptions.value = unref(cachePlainOptions);
        plainSortOptions.value = unref(cachePlainOptions);
        table.setColumns(table.getCacheColumns());
      }

      // Open the pop-up window for drag and drop initialization
      function handleVisibleChange() {
        if (inited) return;
        nextTick(() => {
          const columnListEl = unref(columnListRef);
          if (!columnListEl) return;
          const el = columnListEl.$el;
          if (!el) return;
          // Drag and drop sort
          const { initSortable } = useSortable(el, {
            handle: '.table-coulmn-drag-icon ',
            onEnd: (evt) => {
              const { oldIndex, newIndex } = evt;
              if (isNullAndUnDef(oldIndex) || isNullAndUnDef(newIndex) || oldIndex === newIndex) {
                return;
              }
              // Sort column
              const columns = getColumns();

              if (oldIndex > newIndex) {
                columns.splice(newIndex, 0, columns[oldIndex]);
                columns.splice(oldIndex + 1, 1);
              } else {
                columns.splice(newIndex + 1, 0, columns[oldIndex]);
                columns.splice(oldIndex, 1);
              }

              plainSortOptions.value = columns;
              plainOptions.value = columns;
              table.setColumns(columns);
            },
          });
          initSortable();
          inited = true;
        });
      }

      // Control whether the serial number column is displayed
      function handleIndexCheckChange(e) {
        table.setProps({
          showIndexColumn: e.target.checked,
        });
      }

      // Control whether the check box is displayed
      function handleSelectCheckChange(e) {
        table.setProps({
          rowSelection: e.target.checked ? defaultRowSelection : undefined,
        });
      }

      function handleColumnFixed(item, fixed) {
        if (!state.checkedList.includes(item.dataIndex)) return;

        const columns = getColumns();
        const isFixed = item.fixed === fixed ? false : fixed;
        const index = columns.findIndex((col) => col.dataIndex === item.dataIndex);
        if (index !== -1) {
          columns[index].fixed = isFixed;
        }
        item.fixed = isFixed;

        if (isFixed && !item.width) {
          item.width = 100;
        }
        table.setCacheColumnsByField?.(item.dataIndex, { fixed: isFixed });
        table.setColumns(columns);
      }

      return {
        ...toRefs(state),
        onCheckAllChange,
        onChange,
        plainOptions,
        reset,
        prefixCls,
        columnListRef,
        handleVisibleChange,
        checkIndex,
        checkSelect,
        handleIndexCheckChange,
        handleSelectCheckChange,
        defaultRowSelection,
        handleColumnFixed,
        getPopupContainer,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-column-setting';

  .table-coulmn-drag-icon {
    margin: 0 5px;
    cursor: move;
  }

  .@{prefix-cls} {
    &__popover-title {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__check-item {
      display: flex;
      align-items: center;
      min-width: 100%;
      padding: 4px 16px 8px 0;

      .ant-checkbox-wrapper {
        width: 100%;

        &:hover {
          color: @primary-color;
        }
      }
    }

    &__fixed-left,
    &__fixed-right {
      color: rgba(0, 0, 0, 0.45);
      cursor: pointer;

      &.active,
      &:hover {
        color: @primary-color;
      }

      &.disabled {
        color: @disabled-color;
        cursor: not-allowed;
      }
    }

    &__fixed-right {
      transform: rotate(180deg);
    }

    &__cloumn-list {
      svg {
        width: 1em !important;
        height: 1em !important;
      }

      .ant-popover-inner-content {
        // max-height: 360px;
        padding-right: 0;
        padding-left: 0;
        // overflow: auto;
      }

      .ant-checkbox-group {
        width: 100%;
        min-width: 260px;
        // flex-wrap: wrap;
      }

      .scrollbar {
        height: 220px;
      }
    }
  }
</style>
