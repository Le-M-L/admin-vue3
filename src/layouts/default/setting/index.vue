<template>
  <div @click="openDrawer">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" />
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import SettingDrawer from './SettingDrawer';
  import Icon from '@/components/comps/Icon';

  import { useDrawer } from '@/components/comps/Drawer';

  export default defineComponent({
    name: 'SettingButton',
    components: { SettingDrawer, Icon },
    setup() {
      const [register, { openDrawer }] = useDrawer();

      return {
        register,
        openDrawer,
      };
    },
  });
</script>
