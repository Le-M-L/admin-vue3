<template>
  <ul :class="getClass">
    <slot></slot>
  </ul>
</template>

<script>
  import {
    defineComponent,
    ref,
    computed,
    onMounted,
    watchEffect,
    watch,
    nextTick,
    getCurrentInstance,
    provide,
  } from 'vue';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { propTypes } from '@/config/utils/propTypes';
  import { createSimpleRootMenuContext } from './useSimpleMenuContext';
  import Mitt from '@/config/utils/mitt';
  export default defineComponent({
    name: 'Menu',
    props: {
      theme: propTypes.oneOf(['light', 'dark']).def('light'),
      activeName: propTypes.oneOfType([propTypes.string, propTypes.number]),
      openNames: {
        type: Array,
        default: () => [],
      },
      accordion: propTypes.bool.def(true),
      width: propTypes.string.def('100%'),
      collapsedWidth: propTypes.string.def('48px'),
      indentSize: propTypes.number.def(16),
      collapse: propTypes.bool.def(true),
      activeSubMenuNames: {
        type: Array,
        default: () => [],
      },
    },
    emits: ['select', 'open-change'],
    setup(props, { emit }) {
      const rootMenuEmitter = new Mitt();
      const instance = getCurrentInstance();

      const currentActiveName = ref('');
      const openedNames = ref([]);

      const { prefixCls } = useDesign('menu');

      const isRemoveAllPopup = ref(false);

      createSimpleRootMenuContext({
        rootMenuEmitter: rootMenuEmitter,
        activeName: currentActiveName,
      });

      const getClass = computed(() => {
        const { theme } = props;
        return [
          prefixCls,
          `${prefixCls}-${theme}`,
          `${prefixCls}-vertical`,
          {
            [`${prefixCls}-collapse`]: props.collapse,
          },
        ];
      });

      watchEffect(() => {
        openedNames.value = props.openNames;
      });

      watchEffect(() => {
        if (props.activeName) {
          currentActiveName.value = props.activeName;
        }
      });

      watch(
        () => props.openNames,
        () => {
          nextTick(() => {
            updateOpened();
          });
        }
      );

      function updateOpened() {
        rootMenuEmitter.emit('on-update-opened', openedNames.value);
      }

      function addSubMenu(name) {
        if (openedNames.value.includes(name)) return;
        openedNames.value.push(name);
        updateOpened();
      }

      function removeSubMenu(name) {
        openedNames.value = openedNames.value.filter((item) => item !== name);
        updateOpened();
      }

      function removeAll() {
        openedNames.value = [];
        updateOpened();
      }

      function sliceIndex(index) {
        if (index === -1) return;
        openedNames.value = openedNames.value.slice(0, index + 1);
        updateOpened();
      }

      provide(`subMenu:${instance?.uid}`, {
        addSubMenu,
        removeSubMenu,
        getOpenNames: () => openedNames.value,
        removeAll,
        isRemoveAllPopup,
        sliceIndex,
        level: 0,
        props,
      });

      onMounted(() => {
        openedNames.value = !props.collapse ? [...props.openNames] : [];
        updateOpened();
        rootMenuEmitter.on('on-menu-item-select', (name) => {
          currentActiveName.value = name;

          nextTick(() => {
            props.collapse && removeAll();
          });
          emit('select', name);
        });
      });

      return { getClass, openedNames };
    },
  });
</script>
<style lang="less">
  @import './menu.less';
</style>
