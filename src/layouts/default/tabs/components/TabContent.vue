<template>
  <Dropdown :dropMenuList="getDropMenuList" :trigger="getTrigger" @menuEvent="handleMenuEvent">
    <div :class="`${prefixCls}__info`" @contextmenu="handleContext" v-if="isTabs">
      <span class="ml-1">{{ getTitle }}</span>
    </div>

    <span :class="`${prefixCls}__extra-quick`" v-else @click="handleContext">
      <RightOutlined />
    </span>
  </Dropdown>
</template>

<script>
  import { defineComponent, computed } from 'vue';
  import { Dropdown } from '@/components/comps/Dropdown/index';

  import { TabContentEnum } from '../types';

  import { useDesign } from '@/config/hooks/web/useDesign';
  import { useTabDropdown } from '../useTabDropdown';
  import { RightOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    name: 'TabContent',
    components: { Dropdown, RightOutlined },
    props: {
      tabItem: {
        type: Object,
        default: null,
      },

      type: {
        type: Number,
        default: TabContentEnum.TAB_TYPE,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('multiple-tabs-content');

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props;
        return meta && meta.title;
      });

      const {
        getDropMenuList,
        handleMenuEvent,
        handleContextMenu,
        getTrigger,
        isTabs,
      } = useTabDropdown(props);

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e);
      }
      return {
        prefixCls,
        getDropMenuList,
        handleMenuEvent,
        handleContext,
        getTrigger,
        isTabs,
        getTitle,
      };
    },
  });
</script>
