<template>
  <span :class="$attrs.class">
    <Icon :icon="icon" />
  </span>
</template>
<script>
  import { defineComponent } from 'vue';
  import Icon from '/@/components/Icon';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    components: { Icon },
    props: {
      icon: propTypes.string,
    },
  });
</script>
