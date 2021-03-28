<script>
  // @ts-nocheck
  import { computed, defineComponent, unref, toRef } from 'vue';
  import { BasicMenu } from '@/components/comps/Menu';
  import { SimpleMenu } from '@/components/comps/SimpleMenu';
  import { AppLogo } from '@/components/comps/Application';

  import { MenuModeEnum, MenuSplitTyeEnum } from '@/config/enums/menuEnum';

  import { useMenuSetting } from '@/config/hooks/setting/useMenuSetting';
  import { ScrollContainer } from '@/components/comps/Container';

  import { useGo } from '@/config/hooks/web/usePage';
  import { useSplitMenu } from './useLayoutMenu';
  import { openWindow } from '@/config/utils';
  import { propTypes } from '@/config/utils/propTypes';
  import { isUrl } from '@/config/utils/is';
  import { useRootSetting } from '@/config/hooks/setting/useRootSetting';
  import { useAppInject } from '@/config/hooks/web/useAppInject';
  import { useDesign } from '@/config/hooks/web/useDesign';

  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      theme: propTypes.oneOf(['light', 'dark']),

      splitType: {
        type: Number,
        default: MenuSplitTyeEnum.NONE,
      },

      isHorizontal: propTypes.bool,
      // menu Mode
      menuMode: {
        type: [String],
        default: '',
      },
    },
    setup(props) {
      const go = useGo();

      const {
        getMenuMode,
        getMenuType,
        getMenuTheme,
        getCollapsed,
        getCollapsedShowTitle,
        getAccordion,
        getIsHorizontal,
        getIsSidebarType,
      } = useMenuSetting();
      const { getShowLogo } = useRootSetting();

      const { prefixCls } = useDesign('layout-menu');

      const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

      const { getIsMobile } = useAppInject();

      const getComputedMenuMode = computed(() =>
        unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode)
      );

      const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme));

      const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType));

      const getUseScroll = computed(() => {
        return (
          !unref(getIsHorizontal) &&
          (unref(getIsSidebarType) ||
            props.splitType === MenuSplitTyeEnum.LEFT ||
            props.splitType === MenuSplitTyeEnum.NONE)
        );
      });

      const getWrapperStyle = computed(() => {
        return {
          height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'})`,
        };
      });

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`,
          unref(getComputedMenuTheme),
          {
            [`${prefixCls}--mobile`]: unref(getIsMobile),
          },
        ];
      });
      /**
       * click menu
       * @param menu
       */

      function handleMenuClick(path) {
        go(path);
      }

      /**
       * before click menu
       * @param menu
       */
      async function beforeMenuClickFn(path) {
        if (!isUrl(path)) {
          return true;
        }
        openWindow(path);
        return false;
      }

      function renderHeader() {
        if (!unref(getIsShowLogo) && !unref(getIsMobile)) return null;

        return (
          <AppLogo
            showTitle={!unref(getCollapsed)}
            class={unref(getLogoClass)}
            theme={unref(getComputedMenuTheme)}
          />
        );
      }

      function renderMenu() {
        const menus = unref(menusRef);
        // console.log(menus);
        if (!menus || !menus.length) return null;
        return !props.isHorizontal ? (
          <SimpleMenu
            beforeClickFn={beforeMenuClickFn}
            items={menus}
            theme={unref(getComputedMenuTheme)}
            accordion={unref(getAccordion)}
            collapse={unref(getCollapsed)}
            collapsedShowTitle={unref(getCollapsedShowTitle)}
            onMenuClick={handleMenuClick}
          />
        ) : (
          <BasicMenu
            beforeClickFn={beforeMenuClickFn}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            collapsedShowTitle={unref(getCollapsedShowTitle)}
            showLogo={unref(getIsShowLogo)}
            mode={unref(getComputedMenuMode)}
            theme={unref(getComputedMenuTheme)}
            items={menus}
            accordion={unref(getAccordion)}
            onMenuClick={handleMenuClick}
          />
        );
      }

      return () => {
        return (
          <>
            {renderHeader()}
            {unref(getUseScroll) ? (
              <ScrollContainer style={unref(getWrapperStyle)}>{() => renderMenu()}</ScrollContainer>
            ) : (
              renderMenu()
            )}
          </>
        );
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-menu';
  @logo-prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    &-logo {
      height: @header-height;
      padding: 10px 4px 10px 10px;

      img {
        width: @logo-width;
        height: @logo-width;
      }
    }

    &--mobile {
      .@{logo-prefix-cls} {
        &__title {
          opacity: 1;
        }
      }
    }
  }
</style>
