export const propsData = [
  {
    property: 'startVal',
    type: 'number',
    default: '0',
    optionValues: '-',
    explain: '滚动开始的值',
  },
  {
    property: 'endVal',
    type: 'number',
    default: '-',
    optionValues: '-',
    explain: '滚动结束的值',
  },
  {
    property: 'duration',
    type: 'number',
    default: '3000',
    optionValues: '-',
    explain: '滚动时间/单位毫秒',
  },
  {
    property: 'autoplay',
    type: 'Boolean',
    default: 'true',
    optionValues: '-',
    explain: '是否自动滚动',
  },
  {
    property: 'decimals',
    type: 'Number',
    default: '0',
    optionValues: '-',
    explain: '要显示的小数点后的位数',
  },
  {
    property: 'decimal',
    type: 'String',
    default: '.',
    optionValues: '-',
    explain: `分割小数`,
  },
  {
    property: 'separator',
    type: 'String',
    default: ',',
    optionValues: '-',
    explain: `分隔符`,
  },
  {
    property: 'prefix',
    type: 'String',
    default: '-',
    optionValues: '-',
    explain: `前缀`,
  },
  {
    property: 'suffix',
    type: 'String',
    default: '-',
    optionValues: '-',
    explain: `后缀`,
  },
  {
    property: 'useEasing',
    type: 'Boolean',
    default: 'true',
    optionValues: '-',
    explain: `使用缓动功能`,
  },
  {
    property: 'easingFn',
    type: 'Function',
    default: '-',
    optionValues: '-',
    explain: `缓动功能`,
  },
];
export const eventData = [
  {
    event: 'mountedCallback',
    callback: 'Function',
    explain: '当挂载时将触发',
  },
  {
    event: 'start',
    callback: 'Function',
    explain: '开始滚动',
  },
  {
    event: 'start',
    callback: 'Function',
    explain: '暂停滚动',
  },
  {
    event: 'reset',
    callback: 'Function',
    explain: '重置滚动',
  },
];
export const baseHtml = `<template>
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
</template>
<script >
import { defineComponent } from 'vue';
import { Card } from 'ant-design-vue';
import { CountTo } from '@/components/comps/CountTo/index';

export default defineComponent({
components: {
  Card,
  CardGrid: Card.Grid,
  CountTo,
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
`;
