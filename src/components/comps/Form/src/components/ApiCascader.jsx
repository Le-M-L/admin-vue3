// @ts-nocheck
import { Cascader } from 'ant-design-vue';
import { defineComponent, ref, unref, watchEffect, watch } from 'vue';
import { useAttrs } from '@/config/hooks/core/useAttrs';
import { useRuleFormItem } from '@/config/hooks/component/useFormItem';
import { isFunction, isObject } from '@/config/utils/is';
import { propTypes } from '@/config/utils/propTypes';
export default defineComponent({
  name: 'ApiCascader',
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
    labelField: propTypes.string.def('name'),
    valueField: propTypes.string.def('pkId'),
    childrenField: propTypes.string.def('children'),

    assistApi: {
      // 子集的接口
      type: Function,
      default: null,
    },
    assistParams: {
      // 子集接口的 固定参数
      type: Object,
      default: () => ({}),
    },
    customParams: {
      // 子集取的参数
      type: Object,
      default: () => ({}),
    },
    pageSize: {
      // 条目数
      type: Number,
      default: 99,
    },
    pageNow: {
      // 分页
      type: Number,
      default: 1,
    },
  },
  emits: ['change', 'blur'],
  setup(props) {
    //自定义字段名
    const fieldNames = {
      label: props.labelField,
      value: props.valueField,
      children: props.childrenField,
    };
    // 嵌入到表单中，只需使用钩子绑定来执行表单验证
    const [state] = useRuleFormItem(props);
    // 等待加载
    const loading = ref(false);
    const options = ref([]);

    //初始化的时候调用 并且监听
    watchEffect(() => {
      props.immediate && fetch();
    });
    //获取数据列表数据
    async function fetch() {
      const { labelField, valueField, childrenField, api, params } = props;
      if (!api || !isFunction(api)) return;
      try {
        loading.value = true;
        const { data } = await api(params);
        if (Array.isArray(data)) {
          options.value = unref(data).reduce((prev, next) => {
            if (next) {
              prev.push({
                [labelField]: next[labelField],
                [valueField]: next[valueField],
                [childrenField]: next[childrenField],
                idxParentId: next.idxParentId || null,
                administrationLevel: next.administrationLevel || null,
                isLeaf: false,
              });
            }
            return prev;
          }, []);
          if (unref(state)) {
            dataBackfill(unref(state), unref(options));
          }
          return;
        }
      } catch (error) {
        console.warn(error);
      } finally {
        loading.value = false;
      }
    }
    // 数据回填
    const dataBackfill = (key, treeData) => {
      if (!key || (!Array.isArray(key) && !key.length)) return;
      let arr = []; // 在递归时操作的数组
      let depth = 0; // 定义全局层级
      let valueField = fieldNames.value;
      let children = fieldNames.children;
      // 定义递归函数
      function childrenEach(childrenData, depthN) {
        for (let j = 0; j < childrenData.length; j++) {
          depth = depthN; // 将执行的层级赋值 到 全局层级
          arr[depthN] = childrenData[j][valueField];
          if (childrenData[j][valueField] == key[depth]) {
            //当前匹配的对象
            if (!childrenData[j][children]) dataLoad(childrenData[j]);
            break;
          } else {
            if (childrenData[j][children]) {
              depth++;
              childrenEach(childrenData[j][children], depth);
            }
          }
        }
      }
      return childrenEach(treeData, depth);
    };

    // 监听数据变化
    watch(
      () => state.value,
      (state) => {
        dataBackfill(unref(state), unref(options));
      }
    );

    const attrs = useAttrs();
    //数据回填
    const dataLoad = async (targetOption) => {
      targetOption.loading = true; // load options lazily
      let {
        assistApi,
        pageSize,
        customParams,
        labelField,
        valueField,
        childrenField,
        pageNow,
        assistParams,
        api,
      } = props;

      let params = {
        pageSize,
        pageNow,
        ...assistParams,
      };

      if (isObject(customParams)) {
        Object.keys(customParams).forEach((item) => {
          params[item] = targetOption[customParams[item]];
        });
      }
      let { data = [] } =
        !assistApi || !isFunction(assistApi) ? await api(params) : await assistApi(params);
      targetOption.loading = false;
      if (!data.length) return (targetOption.isLeaf = true);

      targetOption[childrenField] = unref(data).reduce((prev, next) => {
        if (next) {
          prev.push({
            [labelField]: next[labelField],
            [valueField]: next[valueField],
            [childrenField]: next[childrenField],
            idxParentId: next.idxParentId || null,
            administrationLevel: next.administrationLevel || null,
            isLeaf: false,
          });
        }
        return prev;
      }, []);
    };
    // 选择子集触发
    const loadData = (selectedOptions) => {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      dataLoad(targetOption);
    };

    return () => (
      <>
        <Cascader
          value={unref(state)}
          {...attrs}
          fieldNames={fieldNames}
          options={unref(options)}
          loadData={loadData}
        />
      </>
    );
  },
});
