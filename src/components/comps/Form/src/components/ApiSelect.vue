<template>
  <Select v-bind="attrs" :options="getOptions" v-model:value="state">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        apiSelectNotFound
      </span>
    </template>
  </Select>
</template>
<script>
  import { defineComponent, ref, watchEffect, computed, unref } from 'vue';
  import { Select } from 'ant-design-vue';
  import { isFunction } from '@/config/utils/is';
  import { useRuleFormItem } from '@/config/hooks/component/useFormItem';
  import { useAttrs } from '@/config/hooks/core/useAttrs';
  import { get } from 'lodash-es';

  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { propTypes } from '@/config/utils/propTypes';

  export default defineComponent({
    name: 'ApiSelect',
    components: {
      Select,
      LoadingOutlined,
    },
    inheritAttrs: false,
    props: {
      value: propTypes.string,
      numberToString: propTypes.bool,
      api: {
        type: Function,
        default: null,
      },
      // api params
      params: {
        type: Object,
        default: () => {},
      },
      // support xxx.xxx.xx
      resultField: propTypes.string.def(''),
      labelField: propTypes.string.def('label'),
      valueField: propTypes.string.def('value'),
    },
    emits: ['options-change', 'change'],
    setup(props, { emit }) {
      const options = ref([]);
      const loading = ref(false);
      const attrs = useAttrs();

      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props);

      const getOptions = computed(() => {
        const { labelField, valueField, numberToString } = props;

        return unref(options).reduce((prev, next) => {
          if (next) {
            const value = next[valueField];
            prev.push({
              label: next[labelField],
              value: numberToString ? `${value}` : value,
            });
          }
          return prev;
        }, []);
      });

      watchEffect(() => {
        fetch();
      });

      async function fetch() {
        const api = props.api;
        if (!api || !isFunction(api)) return;

        try {
          loading.value = true;
          const res = await api(props.params);
          if (Array.isArray(res)) {
            options.value = res;
            emit('options-change', unref(options));
            return;
          }
          if (props.resultField) {
            options.value = get(res, props.resultField) || [];
          }
          emit('options-change', unref(options));
        } catch (error) {
          console.warn(error);
        } finally {
          loading.value = false;
        }
      }
      return { state, attrs, getOptions, loading };
    },
  });
</script>
