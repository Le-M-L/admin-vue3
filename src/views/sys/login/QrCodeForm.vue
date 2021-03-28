<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <div class="enter-x min-w-64 min-h-64">
      <QrCode
        :value="qrCodeUrl"
        class="enter-x flex justify-center xl:justify-start"
        :width="280"
      />
      <Divider class="enter-x">scanSign</Divider>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin"> backSignIn </Button>
    </div>
  </template>
</template>
<script>
  import { defineComponent, computed, unref } from 'vue';

  import LoginFormTitle from './LoginFormTitle.vue';
  import { Button, Divider } from 'ant-design-vue';
  import { QrCode } from '@/components/comps/Qrcode/index';

  import { useLoginState, LoginStateEnum } from './useLogin';

  const qrCodeUrl = 'https://vvbin.cn/next/login';
  export default defineComponent({
    name: 'QrCodeForm',
    components: {
      Button,
      QrCode,
      Divider,
      LoginFormTitle,
    },
    setup() {
      const { handleBackLogin, getLoginState } = useLoginState();

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.QR_CODE);

      return {
        handleBackLogin,
        qrCodeUrl,
        getShow,
      };
    },
  });
</script>
