<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Switch
      v-bind="getBindValue"
      @change="handleChange"
      :disabled="disabled"
      checkedChildren="开"
      unCheckedChildren="关"
    />
  </div>
</template>
<script>
  import { defineComponent, computed } from 'vue';

  import { Switch } from 'ant-design-vue';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { baseHandler } from '../handler';

  export default defineComponent({
    name: 'SwitchItem',
    components: { Switch },
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
        type: Boolean,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-switch-item');

      const getBindValue = computed(() => {
        return props.def ? { checked: props.def } : {};
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
  @prefix-cls: ~'@{namespace}-setting-switch-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>
