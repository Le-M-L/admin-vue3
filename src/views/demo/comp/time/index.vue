<template>
  <PageWrapper title="时间组件示例">
    <CollapseContainer title="基础示例">
      <Time :value="time1" />
      <br />
      <Time :value="time2" />
    </CollapseContainer>

    <CollapseContainer title="定时更新" class="my-4">
      <Time :value="now" :step="1" />
      <br />
      <Time :value="now" :step="5" />
    </CollapseContainer>

    <CollapseContainer title="定时更新">
      <Time :value="now" mode="date" />
      <br />
      <Time :value="now" mode="datetime" />
      <br />
      <Time :value="now" />
    </CollapseContainer>

    <!-- 代码示例 -->
    <ExampleCode class="mb-4" :html="baseHtml" />

    <PropsTable class="mt-4" :propsData="propsData" />
  </PageWrapper>
</template>
<script>
  import { defineComponent, reactive, toRefs } from 'vue';
  import { PageWrapper } from '@/components/comps/Page';
  import { Time } from '@/components/comps/Time';
  import { CollapseContainer } from '@/components/comps/Container/index';
  import ExampleCode from '@/components/exampleCode';
  import PropsTable from '@/components/PropsTable.vue';
  import { propsData, baseHtml } from './data';
  export default defineComponent({
    components: { PageWrapper, Time, CollapseContainer, ExampleCode, PropsTable },
    setup() {
      const now = new Date().getTime();
      const state = reactive({
        time1: now - 60 * 3 * 1000,
        time2: now - 86400 * 3 * 1000,
      });
      return {
        ...toRefs(state),
        now,
        propsData,
        baseHtml,
      };
    },
  });
</script>
