<template>
  <BasicModal v-bind="$attrs" title="Modal Title" :helpMessage="['提示1', '提示2']">
    Modal Info.
  </BasicModal>
</template>
<script>
  import { defineComponent } from 'vue';
  import { BasicModal } from '@/components/comps/Modal';
  export default defineComponent({
    components: { BasicModal },
  });
</script>
