<template>
  <PageWrapper title="旋转校验示例">
    <div class="flex justify-center p-4 items-center bg-gray-700">
      <RotateDragVerify :src="img" ref="el" @success="handleSuccess" />
    </div>
    <!-- 代码示例 -->
    <ExampleCode class="mb-4" :html="rotateHtml" />

    <PropsTable class="mt-4" :propsData="rotateData" :eventData="rotateEventData" />
  </PageWrapper>
</template>
<script>
  import { defineComponent } from 'vue';
  import { RotateDragVerify } from '@/components/comps/Verify/index';

  import img from '@/assets/images/header.jpg';

  import { PageWrapper } from '@/components/comps/Page';
  import ExampleCode from '@/components/exampleCode';
  import PropsTable from '@/components/PropsTable.vue';
  import { rotateData, rotateHtml, rotateEventData } from './data';

  export default defineComponent({
    components: { RotateDragVerify, PageWrapper, ExampleCode, PropsTable },
    setup() {
      const handleSuccess = () => {
        console.log('success!');
      };
      return {
        handleSuccess,
        img,
        ExampleCode,
        PropsTable,
        rotateData,
        rotateHtml,
        rotateEventData,
      };
    },
  });
</script>
<style lang="less" scoped>
  .bg-gray-700 {
    background: #4a5568;
  }
</style>
