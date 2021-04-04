<template>
  <PageWrapper title="拖动校验示例">
    <div class="flex justify-center p-4 items-center bg-gray-700">
      <BasicDragVerify ref="el1" @success="handleSuccess" />
      <a-button type="primary" class="ml-2" @click="handleBtnClick(el1)"> 还原 </a-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <BasicDragVerify ref="el2" @success="handleSuccess" circle />
      <a-button type="primary" class="ml-2" @click="handleBtnClick(el2)"> 还原 </a-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <BasicDragVerify
        ref="el3"
        @success="handleSuccess"
        text="拖动以进行校验"
        successText="校验成功"
        :barStyle="{
          background: '#018ffb',
        }"
      />
      <a-button type="primary" class="ml-2" @click="handleBtnClick(el3)"> 还原 </a-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <BasicDragVerify ref="el4" @success="handleSuccess">
        <template #actionIcon="isPassing">
          <BugOutlined v-if="isPassing" />
          <RightOutlined v-else />
        </template>
      </BasicDragVerify>
      <a-button type="primary" class="ml-2" @click="handleBtnClick(el4)"> 还原 </a-button>
    </div>

    <div class="flex justify-center p-4 items-center bg-gray-700">
      <BasicDragVerify ref="el5" @success="handleSuccess">
        <template #text="isPassing">
          <div v-if="isPassing">
            <BugOutlined />
            成功
          </div>
          <div v-else>
            拖动
            <RightOutlined />
          </div>
        </template>
      </BasicDragVerify>
      <a-button type="primary" class="ml-2" @click="handleBtnClick(el5)"> 还原 </a-button>
    </div>
    <!-- 代码示例 -->
    <ExampleCode class="mb-4" :html="baseHtml" />

    <PropsTable class="mt-4" :propsData="propsData" :eventData="eventData" />
  </PageWrapper>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { BasicDragVerify } from '@/components/comps/Verify/index';
  import { useMessage } from '@/config/hooks/web/useMessage';
  import { BugOutlined, RightOutlined } from '@ant-design/icons-vue';
  import { PageWrapper } from '@/components/comps/Page';
  import ExampleCode from '@/components/exampleCode';
  import PropsTable from '@/components/PropsTable.vue';
  import { propsData, baseHtml, eventData } from './data';
  export default defineComponent({
    components: {
      BasicDragVerify,
      BugOutlined,
      RightOutlined,
      PageWrapper,
      ExampleCode,
      PropsTable,
    },
    setup() {
      const { createMessage } = useMessage();
      const el1 = ref(null);
      const el2 = ref(null);
      const el3 = ref(null);
      const el4 = ref(null);
      const el5 = ref(null);

      function handleSuccess(data) {
        const { time } = data;
        createMessage.success(`校验成功,耗时${time}秒`);
      }

      function handleBtnClick(elRef) {
        if (!elRef) {
          return;
        }
        elRef.resume();
      }
      return {
        handleSuccess,
        el1,
        el2,
        el3,
        el4,
        el5,
        handleBtnClick,
        propsData,
        baseHtml,
        eventData,
      };
    },
  });
</script>
<style lang="less" scoped>
  .bg-gray-700 {
    background: #4a5568;
  }
</style>
