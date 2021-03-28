<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <InputNumber
      v-bind="$attrs"
      size="small"
      :class="`${prefixCls}-input-number`"
      @change="handleChange"
    />
  </div>
</template>
<script>
  import { defineComponent } from 'vue';

  import { InputNumber } from 'ant-design-vue';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { baseHandler } from '../handler';

  export default defineComponent({
    name: 'InputNumberItem',
    components: { InputNumber },
    props: {
      event: {
        type: Number,
        default: () => {},
      },
      title: {
        type: String,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-input-number-item');

      function handleChange(e) {
        props.event && baseHandler(props.event, e);
      }
      return {
        prefixCls,
        handleChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-input-number-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-input-number {
      width: 126px;
    }
  }
</style>
