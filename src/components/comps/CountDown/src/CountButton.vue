<template>
  <Button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ !isStart ? '获取验证码' : `${currentCount}秒后重新获取` }}
  </Button>
</template>
<script>
  import { defineComponent, ref, watchEffect } from 'vue';

  import { Button } from 'ant-design-vue';

  import { useCountdown } from './useCountdown';
  import { isFunction } from '@/config/utils/is';
  import { propTypes } from '@/config/utils/propTypes';

  export default defineComponent({
    name: 'CountButton',
    components: { Button },
    props: {
      value: propTypes.string,
      count: propTypes.number.def(60),
      beforeStartFunc: {
        type: Function,
        default: null,
      },
    },
    setup(props) {
      const loading = ref(false);

      const { currentCount, isStart, start, reset } = useCountdown(props.count);

      watchEffect(() => {
        props.value === undefined && reset();
      });
      /**
       * @description: Judge whether there is an external function before execution, and decide whether to start after execution
       */
      async function handleStart() {
        const { beforeStartFunc } = props;
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true;
          try {
            const canStart = await beforeStartFunc();
            canStart && start();
          } finally {
            loading.value = false;
          }
        } else {
          start();
        }
      }
      return { handleStart, isStart, currentCount, loading };
    },
  });
</script>
