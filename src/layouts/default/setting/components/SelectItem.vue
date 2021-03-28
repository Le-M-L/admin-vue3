<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Select
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      @change="handleChange"
      :disabled="disabled"
      size="small"
      :options="options"
    />
  </div>
</template>
<script>
  import { defineComponent, computed } from 'vue';

  import { Select } from 'ant-design-vue';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { baseHandler } from '../handler';

  export default defineComponent({
    name: 'SelectItem',
    components: { Select },
    props: {
      event: {
        type: Number,
        default: () => {},
      },
      disabled: {
        type: Boolean,
      },
      title: {
        type: String,
      },
      def: {
        type: [String, Number],
      },
      initValue: {
        type: [String, Number],
      },
      options: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-select-item');
      const getBindValue = computed(() => {
        return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {};
      });

      function handleChange(e) {
        props.event && baseHandler(props.event, e);
      }
      return {
        prefixCls,
        handleChange,
        getBindValue,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-select-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-select {
      width: 126px;
    }
  }
</style>
