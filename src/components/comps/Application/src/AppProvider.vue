<script>
  // @ts-nocheck
  import { defineComponent, toRefs, ref, unref } from 'vue';

  import { createAppProviderContext } from './useAppContext';
  import designSetting from '@/config/settings/designSetting';

  import { createBreakpointListen } from '@/config/hooks/event/useBreakpoint';
  import { propTypes } from '@/config/utils/propTypes';
  import { MenuModeEnum, MenuTypeEnum } from '@/config/enums/menuEnum';
  import { useStore } from 'vuex';
  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props: {
      prefixCls: propTypes.string.def(designSetting.prefixCls),
    },
    setup(props, { slots }) {
      const isMobile = ref(false);
      const isSetState = ref(false);
      const store = useStore();

      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth;
        }
        handleRestoreState();
      });

      const { prefixCls } = toRefs(props);
      createAppProviderContext({ prefixCls, isMobile });

      function handleRestoreState() {
        if (unref(isMobile)) {
          if (!unref(isSetState)) {
            isSetState.value = true;
            const {
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            } = store.getters['app/getProjectConfig'];
            store.commit('app/commitProjectConfigState', {
              menuSetting: {
                type: MenuTypeEnum.SIDEBAR,
                mode: MenuModeEnum.INLINE,
                split: false,
              },
            });
            store.commit('app/commitBeforeMiniState', {
              menuMode,
              menuCollapsed,
              menuType,
              menuSplit,
            });
          }
        } else {
          if (unref(isSetState)) {
            isSetState.value = false;
            const { menuMode, menuCollapsed, menuType, menuSplit } = store.getters[
              'app/getBeforeMiniState'
            ];
            store.commit('app/commitProjectConfigState', {
              menuSetting: {
                type: menuType,
                mode: menuMode,
                collapsed: menuCollapsed,
                split: menuSplit,
              },
            });
          }
        }
      }
      return () => slots.default?.();
    },
  });
</script>
