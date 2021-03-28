<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input size="large" v-model:value="formData.account" placeholder="账号" />
      </FormItem>
      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" placeholder="手机号" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput size="large" v-model:value="formData.sms" placeholder="短信验证码" />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter size="large" v-model:value="formData.password" placeholder="密码" />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          placeholder="确认密码"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small"> 我同意xxx隐私政策 </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        注 册
      </Button>
      <Button size="large" block class="enter-x mt-4" @click="handleBackLogin"> 返 回 </Button>
    </Form>
  </template>
</template>
<script>
  import { defineComponent, reactive, ref, unref, computed } from 'vue';

  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox } from 'ant-design-vue';
  import { StrengthMeter } from '@/components/comps/StrengthMeter';
  import { CountdownInput } from '@/components/comps/CountDown';

  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';

  export default defineComponent({
    name: 'RegisterPasswordForm',
    components: {
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      InputPassword: Input.Password,
      Checkbox,
      StrengthMeter,
      CountdownInput,
      LoginFormTitle,
    },
    setup() {
      const { handleBackLogin, getLoginState } = useLoginState();

      const formRef = ref(null);
      const loading = ref(false);

      const formData = reactive({
        account: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        sms: '',
        policy: false,
      });

      const { getFormRules } = useFormRules(formData);
      const { validForm } = useFormValid(formRef);

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

      async function handleRegister() {
        const data = await validForm();
        if (!data) return;
        console.log(data);
      }

      return {
        formRef,
        formData,
        getFormRules,
        handleRegister,
        loading,
        handleBackLogin,
        getShow,
      };
    },
  });
</script>
