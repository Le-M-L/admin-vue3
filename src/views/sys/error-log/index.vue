<template>
  <div class="p-4">
    <template v-for="src in imgList" :key="src">
      <img :src="src" v-show="false" />
    </template>
    <DetailModal :info="rowInfo" @register="registerModal" />
    <BasicTable @register="register" class="error-handle-table">
      <template #toolbar>
        <a-button @click="fireVueError" type="primary"> fireVueError </a-button>
        <a-button @click="fireResourceError" type="primary"> fireResourceError </a-button>
        <a-button @click="fireAjaxError" type="primary"> fireAjaxError </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[{ label: 'tableActionDesc', onClick: handleDetail.bind(null, record) }]"
        />
      </template>
    </BasicTable>
  </div>
</template>

<script>
  import { defineComponent, watch, ref, nextTick } from 'vue';

  import DetailModal from './DetailModal.vue';
  import { BasicTable, useTable, TableAction } from '@/components/comps/Table/index';

  import { useModal } from '@/components/comps/Modal/index';
  import { useMessage } from '@/config/hooks/web/useMessage';

  import { useStore } from 'vuex';
  import { getColumns } from './data';

  import { cloneDeep } from 'lodash-es';
  import { isDevMode } from '@/config/utils/env';

  export default defineComponent({
    name: 'ErrorHandler',
    components: { DetailModal, BasicTable, TableAction },
    setup() {
      const rowInfo = ref();
      const imgList = ref([]);
      const store = useStore();

      const [register, { setTableData }] = useTable({
        title: 'tableTitle',
        columns: getColumns(),
        actionColumn: {
          width: 80,
          title: 'Action',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const [registerModal, { openModal }] = useModal();

      watch(
        () => store.getters['error/getErrorInfoState'],
        (list) => {
          nextTick(() => {
            setTableData(cloneDeep(list));
          });
        },
        {
          immediate: true,
        }
      );
      const { createMessage } = useMessage();
      if (isDevMode()) {
        createMessage.info('enableMessage');
      }
      // 查看详情
      function handleDetail(row) {
        rowInfo.value = row;
        openModal(true);
      }

      function fireVueError() {
        throw new Error('fire vue error!');
      }

      function fireResourceError() {
        imgList.value.push(`${new Date().getTime()}.png`);
      }

      async function fireAjaxError() {
        // await fireErrorApi();
      }

      return {
        register,
        registerModal,
        handleDetail,
        fireVueError,
        fireResourceError,
        fireAjaxError,
        imgList,
        rowInfo,
      };
    },
  });
</script>
