<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->

<template>
  <RadioGroup v-bind="attrs" v-model:value="state" button-style="solid">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <Radio :value="item.value">
        {{ item.label }}
      </Radio>
    </template>
  </RadioGroup>
</template>
<script>
  import { defineComponent, computed, watchEffect, ref, unref } from 'vue';
  import { Radio } from 'ant-design-vue';
  import { useRuleFormItem } from '@/config/hooks/component/useFormItem';
  import { useAttrs } from '@/config/hooks/core/useAttrs';
  import { isFunction, isString } from '@/config/utils/is';
  import { propTypes } from '@/config/utils/propTypes';
  export default defineComponent({
    name: 'ApiRadio',
    components: {
      RadioGroup: Radio.Group,
      Radio: Radio,
    },
    props: {
      value: {
        type: String,
      },
      options: {
        type: Array,
        default: () => [],
      },
      api: {
        type: Function,
        default: null,
      },
      labelField: propTypes.string.def('valueComment'),
      valueField: propTypes.string.def('dictValue'),
      immediate: propTypes.bool.def(true),
      params: {
        // 请求时参数 初始化调用
        type: Object,
        default: () => {},
      },
    },
    setup(props) {
      const attrs = useAttrs();
      // 嵌入到表单中，只需使用钩子绑定来执行表单验证
      const [state] = useRuleFormItem(props);
      const options = ref([]);
      const loading = ref(false);
      // 处理选项值
      const getOptions = computed(() => {
        const { labelField, valueField } = props;
        return unref(options).reduce((prev, next) => {
          if (next) {
            if (!isString(next)) {
              prev.push({
                label: next[labelField],
                value: next[valueField],
              });
            } else {
              prev.push({
                label: next,
                value: next,
              });
            }
          }
          return prev;
        }, []);
      });

      watchEffect(() => {
        props.immediate && fetch();
      });

      async function fetch() {
        const api = props.api;

        if (!api || !isFunction(api)) {
          options.value = props.options || [];
          return;
        }
        try {
          loading.value = true;
          const { data: res = [] } = await api(props.params);

          if (Array.isArray(res)) {
            options.value = res;
            // 触发表格方法

            return;
          }
          // 触发表格方法
        } catch (error) {
          console.warn(error);
        } finally {
          loading.value = false;
        }
      }

      return { state, getOptions, attrs };
    },
  });
</script>
