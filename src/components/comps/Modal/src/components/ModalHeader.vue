<template>
  <BasicTitle :helpMessage="helpMessage">
    {{ title }}
  </BasicTitle>
</template>
<script>
  import { defineComponent } from 'vue';
  import { BasicTitle } from '@/components/comps/Basic';

  import { propTypes } from '@/config/utils/propTypes';
  export default defineComponent({
    name: 'BasicModalHeader',
    components: { BasicTitle },
    props: {
      helpMessage: {
        type: [String, Array],
      },
      title: propTypes.string,
    },
  });
</script>
