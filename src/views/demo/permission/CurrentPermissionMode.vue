<template>
  <div class="mt-2">
    当前权限模式：
    <a-button type="link">
      {{ permissionMode === PermissionModeEnum.BACK ? '后台权限模式' : '前端角色权限模式' }}
    </a-button>
    <a-button class="ml-4" @click="togglePermissionMode" type="primary"> 切换权限模式 </a-button>
    <Divider />
  </div>
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  import { PermissionModeEnum } from '@/config/enums/appEnum';
  import { Divider } from 'ant-design-vue';
  import { usePermission } from '@/config/hooks/web/usePermission';
  export default defineComponent({
    name: 'CurrentPermissionMode',
    components: { Divider },
    setup() {
      const store = useStore();
      const permissionMode = computed(() => {
        return store.getters['app/getProjectConfig'].permissionMode;
      });
      const { togglePermissionMode } = usePermission();

      return {
        permissionMode,
        PermissionModeEnum,
        togglePermissionMode,
      };
    },
  });
</script>
