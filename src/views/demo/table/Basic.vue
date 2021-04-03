<template>
  <div class="p-4">
    <BasicTable
      title="基础示例"
      titleHelpMessage="温馨提醒"
      :columns="columns"
      :dataSource="data"
      :canResize="canResize"
      :loading="loading"
      :striped="striped"
      :bordered="border"
      showTableSetting
      :pagination="pagination"
    >
      <template #toolbar>
        <a-button type="primary" @click="toggleCanResize">
          {{ !canResize ? '自适应高度' : '取消自适应' }}
        </a-button>
        <a-button type="primary" @click="toggleBorder">
          {{ !border ? '显示边框' : '隐藏边框' }}
        </a-button>
        <a-button type="primary" @click="toggleLoading"> 开启loading </a-button>
        <a-button type="primary" @click="toggleStriped">
          {{ !striped ? '显示斑马纹' : '隐藏斑马纹' }}
        </a-button>
      </template>
    </BasicTable>

    <BasicTable
      showTableSetting
      canRowDrag
      canColDrag
      title="Props"
      titleHelpMessage="温馨提醒"
      :columns="columnsApi"
      :dataSource="dataProps"
      striped
      bordered
    >
    </BasicTable>

    <BasicTable
      title="BasicColumn"
      titleHelpMessage="温馨提醒"
      :columns="columnsApi"
      :dataSource="dataApi"
      striped
      bordered
    >
    </BasicTable>

    <BasicTable
      title="事件"
      titleHelpMessage="事件"
      :columns="columnsApi"
      :dataSource="dataEvent"
      striped
      bordered
    >
    </BasicTable>

    <BasicTable
      title="Slots"
      titleHelpMessage="Slots"
      :columns="columnsApi"
      :dataSource="dataSlot"
      striped
      bordered
    >
    </BasicTable>

    <BasicTable
      title="TableImg 组件"
      titleHelpMessage="TableImg 组件"
      :columns="columnsApi"
      :dataSource="dataImg"
      striped
      bordered
    >
    </BasicTable>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicTable } from '@/components/comps/Table';
  import {
    getBasicColumns,
    getBaseApiData,
    getBaseApi,
    getBasicData,
    getBaseApiEvent,
    getBaseApiSlots,
    getBaseApiImg,
    getBaseApiProps,
  } from './tableData';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const canResize = ref(false);
      const loading = ref(false);
      const striped = ref(true);
      const border = ref(true);
      const pagination = ref(false);
      function toggleCanResize() {
        canResize.value = !canResize.value;
      }
      function toggleStriped() {
        striped.value = !striped.value;
      }
      function toggleLoading() {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          pagination.value = { pageSize: 20 };
        }, 3000);
      }
      function toggleBorder() {
        border.value = !border.value;
      }
      const summaryFunc = (e) => {
        console.log(e);
      };
      return {
        columns: getBasicColumns(),
        data: getBasicData(),
        columnsApi: getBaseApi(),
        dataApi: getBaseApiData(),
        dataEvent: getBaseApiEvent(),
        dataSlot: getBaseApiSlots(),
        dataImg: getBaseApiImg(),
        dataProps: getBaseApiProps(),
        summaryFunc,
        canResize,
        loading,
        striped,
        border,
        toggleStriped,
        toggleCanResize,
        toggleLoading,
        toggleBorder,
        pagination,
      };
    },
  });
</script>
