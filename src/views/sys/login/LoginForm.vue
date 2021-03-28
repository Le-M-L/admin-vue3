<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef" v-show="getShow">
    <FormItem name="account" class="enter-x">
      <Input size="large" v-model:value="formData.account" placeholder="userName" />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="password"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small"> rememberMe </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <!-- No logic, you need to deal with it yourself -->
          <Button type="link" size="small" @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
            forgetPassword
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        loginButton
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        registerButton
      </Button> -->
    </FormItem>
    <ARow class="enter-x">
      <ACol :xs="24" :md="8">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)"> mobileSignInFormTitle </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="xs:my-2 md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)"> qrSignInFormTitle </Button>
      </ACol>
      <ACol :md="7" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)"> registerButton </Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">otherSignIn</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div>
  </Form>
</template>
<script>
  import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue';

  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';
  import {
    GithubFilled,
    WechatFilled,
    AlipayCircleFilled,
    GoogleCircleFilled,
    TwitterCircleFilled,
  } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useMessage } from '@/config/hooks/web/useMessage';
  import { useStore } from 'vuex';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { useKeyPress } from '@/config/hooks/event/useKeyPress';
  import { KeyCodeEnum } from '@/config/enums/keyCodeEnum';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Checkbox,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      Divider,
      LoginFormTitle,
      InputPassword: Input.Password,
      GithubFilled,
      WechatFilled,
      AlipayCircleFilled,
      GoogleCircleFilled,
      TwitterCircleFilled,
    },
    setup() {
      const { notification } = useMessage();
      const { prefixCls } = useDesign('login');

      const { setLoginState, getLoginState } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref(null);
      const loading = ref(false);
      const rememberMe = ref(false);

      const formData = reactive({
        account: 'vben',
        password: '123456',
      });
      const store = useStore();

      const { validForm } = useFormValid(formRef);
      useKeyPress(['enter'], (events) => {
        const keyCode = events.keyCode;

        if (keyCode === KeyCodeEnum.ENTER) {
          handleLogin();
        }
      });

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        try {
          loading.value = true;
          console.log(store);
          const userInfo = await store.dispatch(
            'user/login',
            toRaw({
              password: data.password,
              username: data.account,
            })
          );
          if (userInfo) {
            notification.success({
              message: 'loginSuccessTitle',
              description: `loginSuccessDesc: ${userInfo.realName}`,
              duration: 3,
            });
          }
        } finally {
          loading.value = false;
        }
      }

      return {
        prefixCls,
        formRef,
        formData,
        getFormRules,
        rememberMe,
        handleLogin,
        loading,
        setLoginState,
        LoginStateEnum,
        getShow,
      };
    },
  });
</script>
