<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
  <FrameLayout v-if="getCanEmbedIFramePage" />
</template>

<script>
  import { computed, defineComponent, unref } from 'vue';

  import FrameLayout from '@/layouts/iframe/index.vue';

  import { useRootSetting } from '@/config/hooks/setting/useRootSetting';

  import { useTransitionSetting } from '@/config/hooks/setting/useTransitionSetting';
  import { useMultipleTabSetting } from '@/config/hooks/setting/useMultipleTabSetting';
  import { getTransitionName } from './transition';

  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'PageLayout',
    components: { FrameLayout },
    setup() {
      const { getShowMultipleTab } = useMultipleTabSetting();

      const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting();

      const { getBasicTransition, getEnableTransition } = useTransitionSetting();

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab));

      const { getters } = useStore();

      const getCaches = computed(() => {
        if (!unref(getOpenKeepAlive)) {
          return [];
        }
        // TODO The useStore is used here mainly to solve the problem of circular dependency hot update
        const cacheTabs = getters['tab/getCachedTabsState'];
        return cacheTabs;
      });

      return {
        getTransitionName,
        openCache,
        getEnableTransition,
        getBasicTransition,
        getCaches,
        getCanEmbedIFramePage,
      };
    },
  });
</script>
