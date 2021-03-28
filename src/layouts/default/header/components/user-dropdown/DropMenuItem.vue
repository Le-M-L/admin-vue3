<template>
  <MenuItem :key="key">
    <span class="flex items-center">
      <slot class="mr-1" />
      <span>{{ text }}</span>
    </span>
  </MenuItem>
</template>
<script>
  import { Menu } from 'ant-design-vue';

  import { defineComponent } from 'vue';

  import { propTypes } from '@/config/utils/propTypes';

  export default defineComponent({
    name: 'DropdownMenuItem',
    components: { MenuItem: Menu.Item },
    props: {
      key: propTypes.string,
      text: propTypes.string,
    },
  });
</script>
