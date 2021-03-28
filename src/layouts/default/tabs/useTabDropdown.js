import { computed, unref, reactive } from 'vue';
import { TabContentEnum, MenuEventEnum } from './types';
import store from '@/store';
import router from '@/router';
import { useTabs } from '@/config/hooks/web/useTabs';
import {
  SyncOutlined,
  CloseOutlined,
  VerticalRightOutlined,
  VerticalLeftOutlined,
  PicCenterOutlined,
  MinusOutlined,
} from '@ant-design/icons-vue';

export function useTabDropdown(tabContentProps) {
  const state = reactive({
    current: null,
    currentIndex: 0,
  });

  const { currentRoute } = router;

  const isTabs = computed(() => tabContentProps.type === TabContentEnum.TAB_TYPE);

  const getCurrentTab = computed(() => {
    return unref(isTabs) ? tabContentProps.tabItem : unref(currentRoute);
  });

  /**
   * @description: drop-down list
   */
  const getDropMenuList = computed(() => {
    if (!unref(getCurrentTab)) return;
    const { meta } = unref(getCurrentTab);
    const { path } = unref(currentRoute);

    // Refresh button
    const curItem = state.current;
    const index = state.currentIndex;
    const refreshDisabled = curItem ? curItem.path !== path : true;
    // Close left
    const closeLeftDisabled = index === 0;

    const disabled = store.getters['tab/getTabsState'].length === 1;

    // Close right
    const closeRightDisabled =
      index === store.getters['tab/getTabsState'].length - 1 &&
      store.getters['tab/getLastDragEndIndexState'] >= 0;
    const dropMenuList = [
      {
        icon: <SyncOutlined />,
        event: MenuEventEnum.REFRESH_PAGE,
        text: '重新加载',
        disabled: refreshDisabled,
      },
      {
        icon: <CloseOutlined />,
        event: MenuEventEnum.CLOSE_CURRENT,
        text: '关闭标签页',
        disabled: meta?.affix || disabled,
        divider: true,
      },
      {
        icon: <VerticalRightOutlined />,
        event: MenuEventEnum.CLOSE_LEFT,
        text: '关闭左侧标签页',
        disabled: closeLeftDisabled,
        divider: false,
      },
      {
        icon: <VerticalLeftOutlined />,
        event: MenuEventEnum.CLOSE_RIGHT,
        text: '关闭右侧标签页',
        disabled: closeRightDisabled,
        divider: true,
      },
      {
        icon: <PicCenterOutlined />,
        event: MenuEventEnum.CLOSE_OTHER,
        text: '关闭其他标签页',
        disabled: disabled,
      },
      {
        icon: <MinusOutlined />,
        event: MenuEventEnum.CLOSE_ALL,
        text: '关闭全部标签页',
        disabled: disabled,
      },
    ];

    return dropMenuList;
  });

  const getTrigger = computed(() => {
    return unref(isTabs) ? ['contextmenu'] : ['click'];
  });

  function handleContextMenu(tabItem) {
    return (e) => {
      if (!tabItem) return;
      e?.preventDefault();
      const index = store.getters['tab/getTabsState'].findIndex((tab) => tab.path === tabItem.path);
      state.current = tabItem;
      state.currentIndex = index;
    };
  }

  // Handle right click event
  function handleMenuEvent(menu) {
    const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } = useTabs();
    const { event } = menu;
    switch (event) {
      case MenuEventEnum.SCALE:
        // scaleScreen();
        break;
      case MenuEventEnum.REFRESH_PAGE:
        // refresh page
        refreshPage();
        break;
      // Close current
      case MenuEventEnum.CLOSE_CURRENT:
        close(tabContentProps.tabItem);
        break;
      // Close left
      case MenuEventEnum.CLOSE_LEFT:
        closeLeft();
        break;
      // Close right
      case MenuEventEnum.CLOSE_RIGHT:
        closeRight();
        break;
      // Close other
      case MenuEventEnum.CLOSE_OTHER:
        closeOther();
        break;
      // Close all
      case MenuEventEnum.CLOSE_ALL:
        closeAll();
        break;
    }
  }
  return { getDropMenuList, handleMenuEvent, handleContextMenu, getTrigger, isTabs };
}
