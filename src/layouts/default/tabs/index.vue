<template>
  <div :class="getWrapClass">
    <Tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <TabPane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <TabContent :tabItem="item" />
          </template>
        </TabPane>
      </template>

      <template #tabBarExtraContent v-if="getShowRedo || getShowQuick">
        <TabRedo v-if="getShowRedo" />
        <QuickButton v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" />
      </template>
    </Tabs>
  </div>
</template>
<script>
  import { defineComponent, computed, unref, ref } from 'vue';

  import { Tabs } from 'ant-design-vue';
  import TabContent from './components/TabContent.vue';
  import QuickButton from './components/QuickButton.vue';
  import FoldButton from './components/FoldButton.vue';
  import TabRedo from './components/TabRedo.vue';

  import { useGo } from '@/config/hooks/web/usePage';
  import { useStore } from 'vuex';

  import { initAffixTabs, useTabsDrag } from './useMultipleTabs';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { useMultipleTabSetting } from '@/config/hooks/setting/useMultipleTabSetting';

  import { REDIRECT_NAME } from '@/router/constant';
  import { listenerLastChangeTab } from '@/config/logics/mitt/tabChange';

  import router from '@/router';

  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      QuickButton,
      TabRedo: TabRedo,
      FoldButton,
      Tabs,
      TabPane: Tabs.TabPane,
      TabContent,
    },
    setup() {
      const affixTextList = initAffixTabs();
      const activeKeyRef = ref('');
      const store = useStore();
      useTabsDrag(affixTextList);
      const { prefixCls } = useDesign('multiple-tabs');
      const go = useGo();
      const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting();

      const getTabsState = computed(() => {
        return store.getters['tab/getTabsState'].filter((item) => !item.meta?.hideTab);
      });

      const unClose = computed(() => unref(getTabsState).length === 1);

      const getWrapClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--hide-close`]: unref(unClose),
          },
        ];
      });

      listenerLastChangeTab((route) => {
        const { name } = route;
        if (name === REDIRECT_NAME || !route || !store.getters['user/getTokenState']) return;

        const { path, fullPath, meta = {} } = route;

        const { currentActiveMenu, hideTab } = meta;
        const isHide = !hideTab ? null : currentActiveMenu;
        const p = isHide || fullPath || path;
        if (activeKeyRef.value !== p) {
          activeKeyRef.value = p;
        }

        if (isHide) {
          const findParentRoute = router
            .getRoutes()
            .find((item) => item.path === currentActiveMenu);
          findParentRoute && store.dispatch('tab/addTabAction', findParentRoute);
        } else {
          store.dispatch('tab/addTabAction', unref(route));
        }
      });

      function handleChange(activeKey) {
        activeKeyRef.value = activeKey;
        go(activeKey, false);
      }

      // Close the current tab
      function handleEdit(targetKey) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) return;
        store.dispatch('tab/closeTabByKeyAction', targetKey);
      }
      return {
        prefixCls,
        unClose,
        getWrapClass,
        handleEdit,
        handleChange,
        activeKeyRef,
        getTabsState,
        getShowQuick,
        getShowRedo,
        getShowFold,
      };
    },
  });
</script>
<style lang="less">
  @import './index.less';
</style>
