<template>
  <PageWrapper title="上传组件示例">
    <a-alert message="基础示例" />
    <BasicUpload
      :maxSize="20"
      :maxNumber="10"
      @change="handleChange"
      :api="uploadApi"
      class="my-5"
    />
    <!-- 代码示例 -->
    <ExampleCode :html="baseHtml" />

    <a-alert message="嵌入表单,加入表单校验" />

    <BasicForm @register="register" class="my-5" />
    <!-- 代码示例 -->
    <ExampleCode :html="formHtml" />

    <PropsTable class="mt-4" :propsData="propsData" />
  </PageWrapper>
</template>
<script>
  import { defineComponent } from 'vue';
  import { BasicUpload } from '@/components/comps/Upload';
  import { useMessage } from '@/config/hooks/web/useMessage';
  import { BasicForm, useForm } from '@/components/comps/Form/index';
  import { PageWrapper } from '@/components/comps/Page';
  import { Alert } from 'ant-design-vue';

  import { uploadApi } from '@/api/sys/upload';

  import ExampleCode from '@/components/exampleCode';
  import PropsTable from '@/components/PropsTable.vue';
  import { propsData, baseHtml, formHtml } from './data';
  const schemas = [
    {
      field: 'field1',
      component: 'Upload',
      label: '字段1',
      colProps: {
        span: 8,
      },
      rules: [{ required: true, message: '请选择上传文件' }],
      componentProps: {
        api: uploadApi,
      },
    },
  ];
  export default defineComponent({
    components: {
      BasicUpload,
      BasicForm,
      PageWrapper,
      [Alert.name]: Alert,
      ExampleCode,
      PropsTable,
    },
    setup() {
      const { createMessage } = useMessage();
      const [register] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 16,
        },
      });
      return {
        handleChange: (list) => {
          createMessage.info(`已上传文件${JSON.stringify(list)}`);
        },
        uploadApi,
        register,
        propsData,
        baseHtml,
        formHtml,
      };
    },
  });
</script>
