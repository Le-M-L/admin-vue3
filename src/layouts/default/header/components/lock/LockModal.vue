<template>
  <BasicModal
    :footer="null"
    title="lockScreen"
    v-bind="$attrs"
    :class="prefixCls"
    @register="register"
  >
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <img :src="headerImg" :class="`${prefixCls}__header-img`" />
        <p :class="`${prefixCls}__header-name`">
          {{ getRealName }}
        </p>
      </div>

      <BasicForm @register="registerForm" />

      <div :class="`${prefixCls}__footer`">
        <a-button type="primary" block class="mt-2" @click="handleLock"> lockScreenBtn </a-button>
      </div>
    </div>
  </BasicModal>
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { BasicModal, useModalInner } from '@/components/comps/Modal/index';
  import { BasicForm, useForm } from '@/components/comps/Form/index';
  import { useStore } from 'vuex';
  import headerImg from '@/assets/images/header.jpg';
  export default defineComponent({
    name: 'LockModal',
    components: { BasicModal, BasicForm },

    setup() {
      const { prefixCls } = useDesign('header-lock-modal');
      const store = useStore();

      const getRealName = computed(() => {
        return store.getters['user/getUserInfoState']?.realName;
      });
      const [register, { closeModal }] = useModalInner();

      const [registerForm, { validateFields, resetFields }] = useForm({
        showActionButtonGroup: false,
        schemas: [
          {
            field: 'password',
            label: 'lockScreenPassword',
            component: 'InputPassword',
            required: true,
          },
        ],
      });

      async function handleLock() {
        const values = await validateFields();
        const password = values.password;
        closeModal();
        store.commit('lock/commitLockInfoState', {
          isLock: true,
          pwd: password,
        });
        await resetFields();
      }

      return {
        prefixCls,
        getRealName,
        register,
        registerForm,
        handleLock,
        headerImg,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-lock-modal';

  .@{prefix-cls} {
    &__entry {
      position: relative;
      height: 240px;
      padding: 130px 30px 60px 30px;
      background: #fff;
      border-radius: 10px;
    }

    &__header {
      position: absolute;
      top: 0;
      left: calc(50% - 45px);
      width: auto;
      text-align: center;

      &-img {
        width: 70px;
        border-radius: 50%;
      }

      &-name {
        margin-top: 5px;
      }
    }

    &__footer {
      text-align: center;
    }
  }
</style>
