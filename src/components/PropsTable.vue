<template>
  <BasicTable
    :pagination="false"
    :title="title"
    :columns="propsData"
    :dataSource="dataSource"
    striped
    bordered
  >
  </BasicTable>
</template>

<script>
  import { BasicTable } from '@/components/comps/Table';
  import { propsData } from '@/config/enums/propsEnum';
  export default {
    name: 'PropsTable',
    components: { BasicTable },
    props: {
      title: {
        type: String,
        default: 'Props',
      },
      dataSource: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      console.log(props);
      return {
        propsData,
      };
    },
  };
</script>

<style></style>
