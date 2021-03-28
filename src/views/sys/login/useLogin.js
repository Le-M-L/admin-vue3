import { ref, computed, unref } from 'vue';

export const LoginStateEnum = {
  LOGIN: 0,
  REGISTER: 1,
  RESET_PASSWORD: 2,
  MOBILE: 3,
  QR_CODE: 4,
};

const currentState = ref(LoginStateEnum.LOGIN);

export function useLoginState() {
  function setLoginState(state) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid(formRef) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data;
  }

  return { validForm };
}

export function useFormRules(formData) {
  const getAccountFormRule = computed(() => createRule('accountPlaceholder'));
  const getPasswordFormRule = computed(() => createRule('passwordPlaceholder'));
  const getSmsFormRule = computed(() => createRule('smsPlaceholder'));
  const getMobileFormRule = computed(() => createRule('mobilePlaceholder'));

  const validatePolicy = async (_, value) => {
    return !value ? Promise.reject('policyPlaceholder') : Promise.resolve();
  };

  const validateConfirmPassword = (password) => {
    return async (_, value) => {
      if (!value) {
        return Promise.reject('passwordPlaceholder');
      }
      if (value !== password) {
        return Promise.reject('diffPwd');
      }
      return Promise.resolve();
    };
  };

  const getFormRules = computed(() => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);
    const smsFormRule = unref(getSmsFormRule);
    const mobileFormRule = unref(getMobileFormRule);

    const mobileRule = {
      sms: smsFormRule,
      mobile: mobileFormRule,
    };
    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          account: accountFormRule,
          password: passwordFormRule,
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
          policy: [{ validator: validatePolicy, trigger: 'change' }],
          ...mobileRule,
        };

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          account: accountFormRule,
          ...mobileRule,
        };

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return mobileRule;

      // login form rules
      default:
        return {
          account: accountFormRule,
          password: passwordFormRule,
        };
    }
  });
  return { getFormRules };
}

function createRule(message) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}
