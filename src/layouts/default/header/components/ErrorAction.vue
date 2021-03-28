<template>
  <Tooltip
    title="tooltipErrorLog"
    placement="bottom"
    :mouseEnterDelay="0.5"
    @click="handleToErrorList"
  >
    <Badge :count="getCount" :offset="[0, 10]" dot :overflowCount="99">
      <Icon icon="ion:bug-outline" />
    </Badge>
  </Tooltip>
</template>
<script>
  import { defineComponent, computed } from 'vue';
  import { Tooltip, Badge } from 'ant-design-vue';
  import Icon from '@/components/comps/Icon';

  import { PageEnum } from '@/config/enums/pageEnum';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'ErrorAction',
    components: { Icon, Tooltip, Badge },

    setup() {
      const { push } = useRouter();
      const store = useStore();

      const getCount = computed(() => {
        return store.getters['error/getErrorListCountState'];
      });

      function handleToErrorList() {
        push(PageEnum.ERROR_LOG_PAGE).then(() => {
          store.commit('error/commitErrorListCountState', 0);
        });
      }

      return {
        getCount,
        handleToErrorList,
      };
    },
  });
</script>
