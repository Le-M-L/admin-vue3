export const propsData = [
  {
    property: 'value',
    type: 'number',
    default: '0',
    optionValues: '-',
    explain: '日期/单位毫秒',
  },
  {
    property: 'step',
    type: 'number',
    default: '-',
    optionValues: '-',
    explain: '更新时间间隔',
  },
  {
    property: 'mode',
    type: 'string',
    default: 'relative',
    optionValues: `date/datetime/relative`,
    explain: '格式',
  },
];

export const baseHtml = `<template>
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
</PageWrapper>
</template>
<script >
import { defineComponent, reactive, toRefs } from 'vue';
import { PageWrapper } from '@/components/compps/Page';
import { Time } from '@/components/compps/Time';
import { CollapseContainer } from '@/components/compps/Container/index';

export default defineComponent({
  components: { PageWrapper, Time, CollapseContainer },
  setup() {
    const now = new Date().getTime();
    const state = reactive({
      time1: now - 60 * 3 * 1000,
      time2: now - 86400 * 3 * 1000,
    });
    return {
      ...toRefs(state),
      now,
    };
  },
});
</script>

`;
