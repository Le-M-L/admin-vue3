<template>
  <div>
    <CollapseContainer v-if="propsData.length" class="mt-4">
      <template #title>
        <div>
          <span>Props 说明</span>
          <span class="ml-4" v-if="link">
            除以下参数外，官方文档内的 props 也都支持，具体可以参考
            <a-button type="link" @click="skipOpen">antv Description</a-button>
          </span>
        </div>
      </template>
      <BasicTable @register="register"> </BasicTable>
    </CollapseContainer>

    <CollapseContainer v-if="eventData.length" class="mt-4" title="事件 说明">
      <BasicTable
        :pagination="false"
        :canResize="false"
        :columns="eventColumns"
        :dataSource="eventData"
        striped
        bordered
      >
      </BasicTable>
    </CollapseContainer>

    <CollapseContainer v-if="slotsData.length" class="mt-4" title="Slots 说明">
      <BasicTable
        :pagination="false"
        :canResize="false"
        :columns="columnsData"
        :dataSource="slotsData"
        striped
        bordered
      >
      </BasicTable>
    </CollapseContainer>
  </div>
</template>

<script>
  import { BasicTable, useTable } from '@/components/comps/Table';
  import { CollapseContainer } from '@/components/comps/Container/index';
  import { columnsData, eventColumns } from '@/config/enums/propsEnum';
  export default {
    name: 'PropsTable',
    components: { BasicTable, CollapseContainer },
    props: {
      propsData: {
        type: Array,
        default: () => [],
      },
      slotsData: {
        type: Array,
        default: () => [],
      },
      eventData: {
        type: Array,
        default: () => [],
      },
      link: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const [register] = useTable({
        isTreeTable: true,
        columns: columnsData,
        dataSource: props.propsData,
        striped: true,
        bordered: true,
        pagination: false,
        canResize: false,
      });
      const skipOpen = () => {
        if (!props.link) return;
        window.open(props.link);
      };
      return {
        columnsData,
        register,
        skipOpen,
        eventColumns,
      };
    },
  };
</script>

<style></style>
