<template>
  <PageWrapper title="数字动画示例">
    <Card>
      <CardGrid class="count-to-demo-card">
        <CountTo prefix="$" :startVal="1" :endVal="200000" :duration="8000" />
      </CardGrid>
      <CardGrid class="count-to-demo-card">
        <CountTo suffix="$" :startVal="1" :endVal="300000" :decimals="2" :duration="6000" />
      </CardGrid>
      <CardGrid class="count-to-demo-card">
        <CountTo suffix="$" :startVal="1" :endVal="400000" :duration="7000" />
      </CardGrid>
      <CardGrid class="count-to-demo-card">
        <CountTo separator="-" :startVal="10000" :endVal="500000" :duration="8000" />
      </CardGrid>
    </Card>
    <!-- 代码示例 -->
    <ExampleCode class="mb-4" :html="baseHtml" />

    <PropsTable class="mt-4" :propsData="propsData" :eventData="eventData" />
  </PageWrapper>
</template>
<script>
  import { defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';
  import { CountTo } from '@/components/comps/CountTo/index';
  import { PageWrapper } from '@/components/comps/Page';
  import ExampleCode from '@/components/exampleCode';
  import PropsTable from '@/components/PropsTable.vue';
  import { propsData, baseHtml, eventData } from './data';
  export default defineComponent({
    components: {
      Card,
      CardGrid: Card.Grid,
      CountTo,
      PageWrapper,
      ExampleCode,
      PropsTable,
    },
    setup() {
      return {
        propsData,
        baseHtml,
        eventData,
      };
    },
  });
</script>
<style lang="less" scoped>
  .count-to-demo {
    &-card {
      width: 50%;
      font-size: 30px;
      text-align: center;
    }
  }
</style>
