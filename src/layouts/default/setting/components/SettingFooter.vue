<template>
  <div :class="prefixCls">
    <a-button type="primary" block @click="handleCopy">
      <CopyOutlined class="mr-2" />
      拷贝
    </a-button>

    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <RedoOutlined class="mr-2" />
      重置
    </a-button>

    <a-button color="error" block @click="handleClearAndRedo">
      <RedoOutlined class="mr-2" />
      清空缓存并返回登录页
    </a-button>
  </div>
</template>
<script>
  import { defineComponent, unref } from 'vue';

  import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue';

  import { useStore } from 'vuex';

  import { useDesign } from '@/config/hooks/web/useDesign';
  import { useMessage } from '@/config/hooks/web/useMessage';
  import { useCopyToClipboard } from '@/config/hooks/web/useCopyToClipboard';
  import { useRootSetting } from '@/config/hooks/setting/useRootSetting';

  import { updateColorWeak } from '@/config/logics/theme/updateColorWeak';
  import { updateGrayMode } from '@/config/logics/theme/updateGrayMode';

  import defaultSetting from '@/config/settings/projectSetting';
  export default defineComponent({
    name: 'SettingFooter',
    components: { CopyOutlined, RedoOutlined },
    setup() {
      const { getRootSetting } = useRootSetting();
      const { prefixCls } = useDesign('setting-footer');
      const { createSuccessModal, createMessage } = useMessage();
      const store = useStore();
      function handleCopy() {
        const { isSuccessRef } = useCopyToClipboard(JSON.stringify(unref(getRootSetting), null, 2));
        unref(isSuccessRef) &&
          createSuccessModal({
            title: '操作成功',
            content: '复制成功,请到 src/settings/projectSetting.js 中修改配置',
          });
      }
      function handleResetSetting() {
        try {
          store.commit('app/commitProjectConfigState', defaultSetting);
          const { colorWeak, grayMode } = defaultSetting;
          // updateTheme(themeColor);
          updateColorWeak(colorWeak);
          updateGrayMode(grayMode);
          createMessage.success('重置成功');
        } catch (error) {
          createMessage.error(error);
        }
      }

      function handleClearAndRedo() {
        localStorage.clear();
        store.dispatch('app/resumeAllState');
        store.commit('permission/commitResetState');
        store.commit('tab/commitResetState');
        store.commit('user/commitResetState');
        location.reload();
      }
      return {
        prefixCls,
        handleCopy,
        handleResetSetting,
        handleClearAndRedo,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
