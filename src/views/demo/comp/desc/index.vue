<template>
  <PageWrapper title="详情组件示例">
    <Description
      title="基础示例"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="3"
      :data="mockData"
      :schema="schema"
    />
    <!-- 示列说明 -->
    <ExampleCode :html="baseHtml" />

    <Description
      class="mt-4"
      title="垂直示例"
      layout="vertical"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="2"
      :data="mockData"
      :schema="schema"
      :useCollapse="true"
    />
    <!-- 示列说明 -->
    <ExampleCode :html="verticalHtml" />

    <Description @register="register" class="mt-4" />
    <!-- 示列说明 -->
    <ExampleCode :html="useHtml" />

    <Description @register="register1" class="mt-4" />
    <!-- 示列说明 -->
    <ExampleCode :html="useBorderHtml" />

    <PropsTable
      class="mt-4"
      :propsData="descData"
      link="https://2x.antdv.com/components/descriptions-cn/#API"
    />
  </PageWrapper>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Description, useDescription } from '@/components/comps/Description/index';
  import { PageWrapper } from '@/components/comps/Page';
  import ExampleCode from '@/components/exampleCode';
  import PropsTable from '@/components/PropsTable.vue';
  import { descData, baseHtml, verticalHtml, useHtml, useBorderHtml } from './descData';
  const mockData = {
    username: 'test',
    nickName: 'VB',
    age: 25,
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];

  export default defineComponent({
    components: { Description, PageWrapper, PropsTable, ExampleCode },
    setup() {
      const [register] = useDescription({
        title: 'useDescription',
        data: mockData,
        schema: schema,
      });
      const [register1] = useDescription({
        title: '无边框',
        bordered: false,
        data: mockData,
        schema: schema,
      });
      return {
        mockData,
        schema,
        register,
        register1,
        descData,
        baseHtml,
        verticalHtml,
        useHtml,
        useBorderHtml,
      };
    },
  });
</script>
