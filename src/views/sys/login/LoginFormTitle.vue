<template>
  <h2 class="font-bold text-2xl xl:text-3xl enter-x text-center xl:text-left mb-6">
    {{ getFormTitle }}
  </h2>
</template>
<script>
  import { defineComponent, computed, unref } from 'vue';

  import { LoginStateEnum, useLoginState } from './useLogin';

  export default defineComponent({
    name: 'LoginFormTitle',
    setup() {
      const { getLoginState } = useLoginState();

      const getFormTitle = computed(() => {
        const titleObj = {
          [LoginStateEnum.RESET_PASSWORD]: 'forgetFormTitle',
          [LoginStateEnum.LOGIN]: 'signInFormTitle',
          [LoginStateEnum.REGISTER]: 'signUpFormTitle',
          [LoginStateEnum.MOBILE]: 'mobileSignInFormTitle',
          [LoginStateEnum.QR_CODE]: 'qrSignInFormTitle',
        };
        return titleObj[unref(getLoginState)];
      });

      return {
        getFormTitle,
      };
    },
  });
</script>
