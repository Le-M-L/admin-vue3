<template>
  <TabContent :type="TabContentEnum.EXTRA_TYPE" :tabItem="$route" />
</template>
<script>
  import { defineComponent } from 'vue';

  import { TabContentEnum } from '../types';

  import TabContent from './TabContent.vue';
  export default defineComponent({
    name: 'QuickButton',
    components: {
      TabContent,
    },
    setup() {
      return {
        TabContentEnum,
      };
    },
  });
</script>
