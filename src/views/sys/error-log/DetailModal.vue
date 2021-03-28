<template>
  <BasicModal :width="800" title="tableActionDesc" v-bind="$attrs">
    <Description :data="info" @register="register" />
  </BasicModal>
</template>
<script>
  import { defineComponent } from 'vue';
  import { BasicModal } from '@/components/comps/Modal/index';
  import { Description, useDescription } from '@/components/comps/Description/index';

  import { getDescSchema } from './data';

  export default defineComponent({
    name: 'ErrorLogDetailModal',
    components: { BasicModal, Description },
    props: {
      info: {
        type: Object,
        default: null,
      },
    },
    setup() {
      const [register] = useDescription({
        column: 2,
        schema: getDescSchema(),
      });

      return {
        register,
      };
    },
  });
</script>
