<template>
  <div @click="openDrawer">
    <SettingOutlined />
    <SettingDrawer @register="register" />
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import SettingDrawer from './SettingDrawer';
  import { SettingOutlined } from '@ant-design/icons-vue';

  import { useDrawer } from '@/components/comps/Drawer';

  export default defineComponent({
    name: 'SettingButton',
    components: { SettingDrawer, SettingOutlined },
    setup() {
      const [register, { openDrawer }] = useDrawer();

      return {
        register,
        openDrawer,
      };
    },
  });
</script>
