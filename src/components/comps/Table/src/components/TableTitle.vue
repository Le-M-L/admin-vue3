<template>
  <BasicTitle :class="prefixCls" v-if="getTitle" :helpMessage="helpMessage">
    {{ getTitle }}
  </BasicTitle>
</template>
<script>
  import { computed, defineComponent } from 'vue';

  import { BasicTitle } from '@/components/comps/Basic/index';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { isFunction } from '@/config/utils/is';
  export default defineComponent({
    name: 'BasicTableTitle',
    components: { BasicTitle },
    props: {
      title: {
        type: [Function, String],
      },
      getSelectRows: {
        type: Function,
      },
      helpMessage: {
        type: [String, Array],
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-table-title');

      const getTitle = computed(() => {
        const { title, getSelectRows = () => {} } = props;
        let tit = title;

        if (isFunction(title)) {
          tit = title({
            selectRows: getSelectRows(),
          });
        }
        return tit;
      });

      return { getTitle, prefixCls };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-table-title';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
