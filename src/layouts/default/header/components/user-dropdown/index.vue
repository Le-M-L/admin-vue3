<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="headerImg" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          key="doc"
          text="dropdownItemDoc"
          icon="ion:document-text-outline"
          v-if="getShowDoc"
        />
        <MenuDivider v-if="getShowDoc" />
        <MenuItem key="lock" text="tooltipLock" icon="ion:lock-closed-outline" />
        <MenuItem key="logout" text="dropdownItemLoginOut" icon="ion:power-outline" />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
</template>
<script>
  // components
  import { Dropdown, Menu } from 'ant-design-vue';

  import { defineComponent, computed } from 'vue';

  import { DOC_URL } from '@/config/settings/siteSetting';

  import { useStore } from 'vuex';
  import { useHeaderSetting } from '@/config/hooks/setting/useHeaderSetting';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { useModal } from '@/components/comps/Modal';

  import headerImg from '@/assets/images/header.jpg';
  import { propTypes } from '@/config/utils/propTypes';
  import { openWindow } from '@/config/utils';

  import { createAsyncComponent } from '@/config/utils/factory/createAsyncComponent';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      MenuDivider: Menu.Divider,
      LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { getShowDoc } = useHeaderSetting();
      const store = useStore();

      const getUserInfo = computed(() => {
        const { realName = '', desc } = store.getters['user/getUserInfoState'] || {};
        return { realName, desc };
      });

      const [register, { openModal }] = useModal();

      function handleLock() {
        openModal(true);
      }

      //  login out
      function handleLoginOut() {
        store.dispatch('user/confirmLoginOut');
      }

      // open doc
      function openDoc() {
        openWindow(DOC_URL);
      }

      function handleMenuClick(e) {
        switch (e.key) {
          case 'logout':
            handleLoginOut();
            break;
          case 'doc':
            openDoc();
            break;
          case 'lock':
            handleLock();
            break;
        }
      }

      return {
        prefixCls,
        getUserInfo,
        handleMenuClick,
        getShowDoc,
        headerImg,
        register,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    &:hover {
      background: @header-light-bg-hover-color;
    }

    img {
      width: 26px;
      height: 26px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background: @header-dark-bg-hover-color;
      }
    }

    &--light {
      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
