<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>
<script>
  // @ts-nocheck
  import { defineComponent } from 'vue';
  import { initAppConfigStore } from '@/config/logics/initAppConfig';

  import { AppProvider } from '@/components/comps/Application';
  export default defineComponent({
    name: 'App',
    components: { AppProvider },
    setup() {
      // 初始化系统配置
      initAppConfigStore();
    },
  });
</script>
<style scoped lang="less"></style>
