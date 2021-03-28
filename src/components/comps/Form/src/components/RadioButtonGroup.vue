<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->

<template>
  <RadioGroup v-bind="attrs" v-model:value="state" button-style="solid">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <RadioButton :value="item.value">
        {{ item.label }}
      </RadioButton>
    </template>
  </RadioGroup>
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import { Radio } from 'ant-design-vue';
  import { isString } from '@/config/utils/is';
  import { useRuleFormItem } from '@/config/hooks/component/useFormItem';
  import { useAttrs } from '@/config/hooks/core/useAttrs';

  export default defineComponent({
    name: 'RadioButtonGroup',
    components: {
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
    },
    props: {
      value: {
        type: String,
      },
      options: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
      const attrs = useAttrs();
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props);
      // Processing options value
      const getOptions = computed(() => {
        const { options } = props;
        if (!options || options?.length === 0) return [];

        const isStringArr = options.some((item) => isString(item));
        if (!isStringArr) return options;

        return options.map((item) => ({ label: item, value: item }));
      });

      return { state, getOptions, attrs };
    },
  });
</script>
