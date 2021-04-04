// @ts-nocheck
import { Checkbox } from 'ant-design-vue';
import { defineComponent, watchEffect, reactive, watch, unref, computed, ref } from 'vue';
// import { useAttrs } from '@/config/hooks/core/useAttrs';
import { useRuleFormItem } from '@/config/hooks/component/useFormItem';
import { isFunction, isString } from '@/config/utils/is';
import { propTypes } from '@/config/utils/propTypes';
export default defineComponent({
  name: 'ApiCheckbox',
  inheritAttrs: false,
  props: {
    value: {
      // 数据双向绑定值
      type: Array,
      default: null,
    },
    api: {
      // 请求方法
      type: Function,
      default: null,
    },
    params: {
      // 请求时参数 初始化调用
      type: Object,
      default: () => ({}),
    },
    labelField: propTypes.string.def('valueComment'),
    valueField: propTypes.string.def('dictValue'),
    checkAllText: propTypes.string.def('全选'),
    immediate: propTypes.bool.def(true),
    isCheckAll: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'blur'],
  setup(props, { emit }) {
    // 嵌入到表单中，只需使用钩子绑定来执行表单验证
    const [state] = useRuleFormItem(props);
    const checkState = reactive({
      indeterminate: true,
      checkAll: false,
    });
    // 可选数据 options
    const options = ref([]);
    const loading = ref(false);

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
    watch(
      () => state.value,
      (val) => {
        checkState.indeterminate = val && val.length < unref(options).length;
        checkState.checkAll = val?.length === unref(options).length;
      }
    );

    //初始化的时候调用 并且监听
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
          return;
        }
      } catch (error) {
        console.warn(error);
      } finally {
        loading.value = false;
      }
    }

    function renderCheckbox() {
      return props.isCheckAll ? (
        <Checkbox
          checked={checkState.checkAll}
          indeterminate={checkState.indeterminate}
          onChange={onCheckAllChange}
        >
          {props.checkAllText}
        </Checkbox>
      ) : null;
    }

    const onCheckAllChange = (e) => {
      let checked = e.target.checked ? options.value : [];
      emit(
        'change',
        checked.map((item) => item[props.valueField])
      );
      Object.assign(checkState, {
        indeterminate: false,
      });
    };
    const onCheckChange = (e) => {
      emit('change', e);
    };
    return () => (
      <>
        {renderCheckbox()}

        <Checkbox.Group onChange={onCheckChange} value={unref(state)}>
          {unref(getOptions).map((item) => {
            return (
              <Checkbox value={item.value} key={item.value}>
                {item.label}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </>
    );
  },
});
