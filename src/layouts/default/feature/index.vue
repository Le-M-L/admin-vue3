<script>
  import { defineComponent, computed, unref } from 'vue';
  import { BackTop } from 'ant-design-vue';

  import { useRootSetting } from '@/config/hooks/setting/useRootSetting';
  import { useHeaderSetting } from '@/config/hooks/setting/useHeaderSetting';
  import { useDesign } from '@/config/hooks/web/useDesign';

  import { SettingButtonPositionEnum } from '@/config/enums/appEnum';
  import { createAsyncComponent } from '@/config/utils/factory/createAsyncComponent';

  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      BackTop,
      LayoutLockPage: createAsyncComponent(() => import('@/views/sys/lock/index.vue')),
      SettingDrawer: createAsyncComponent(() => import('@/layouts/default/setting/index.vue')),
    },
    setup() {
      const {
        getUseOpenBackTop,
        getShowSettingButton,
        getSettingButtonPosition,
        getFullContent,
      } = useRootSetting();

      const { prefixCls } = useDesign('setting-drawer-fearure');
      const { getShowHeader } = useHeaderSetting();

      const getIsFixedSettingDrawer = computed(() => {
        if (!unref(getShowSettingButton)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingButtonPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return !unref(getShowHeader) || unref(getFullContent);
        }
        return settingButtonPosition === SettingButtonPositionEnum.FIXED;
      });

      return {
        getTarget: () => document.body,
        getUseOpenBackTop,
        getIsFixedSettingDrawer,
        prefixCls,
      };
    },
  });
</script>

<template>
  <LayoutLockPage />
  <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
  <SettingDrawer v-if="getIsFixedSettingDrawer" :class="prefixCls" />
</template>

<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-drawer-fearure';

  .@{prefix-cls} {
    position: absolute;
    top: 45%;
    right: 0;
    z-index: 10;
    display: flex;
    padding: 10px;
    color: @white;
    cursor: pointer;
    background: @primary-color;
    border-radius: 6px 0 0 6px;
    justify-content: center;
    align-items: center;

    svg {
      width: 1em;
      height: 1em;
    }
  }
</style>
