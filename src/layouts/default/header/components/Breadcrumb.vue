<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes, paths }">
        <Icon :icon="route.meta.icon" v-if="getShowBreadCrumbIcon && route.meta.icon" />
        <span v-if="!hasRedirect(routes, route)">
          {{ route.name || route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ route.name || route.meta.title }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script>
  import { defineComponent, ref, watchEffect } from 'vue';

  import { Breadcrumb } from 'ant-design-vue';
  import Icon from '@/components/comps/Icon';

  import { useDesign } from '@/config/hooks/web/useDesign';
  import { useRootSetting } from '@/config/hooks/setting/useRootSetting';
  import { useGo } from '@/config/hooks/web/usePage';
  import { useRouter } from 'vue-router';

  import { propTypes } from '@/config/utils/propTypes';
  import { isString } from '@/config/utils/is';
  import { filter } from '@/config/utils/helper/treeHelper';
  import { getMenus } from '@/router/menus';

  import { REDIRECT_NAME } from '@/router/constant';
  import { getAllParentPath } from '@/router/helper/menuHelper';

  export default defineComponent({
    name: 'LayoutBreadcrumb',
    components: { Icon, [Breadcrumb.name]: Breadcrumb },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const routes = ref([]);
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-breadcrumb');
      const { getShowBreadCrumbIcon } = useRootSetting();

      watchEffect(async () => {
        if (currentRoute.value.name === REDIRECT_NAME) return;
        const menus = await getMenus();

        const routeMatched = currentRoute.value.matched;
        const cur = routeMatched?.[routeMatched.length - 1];
        let path = currentRoute.value.path;

        if (cur && cur?.meta?.currentActiveMenu) {
          path = cur.meta.currentActiveMenu;
        }

        const parent = getAllParentPath(menus, path);
        const filterMenus = menus.filter((item) => item.path === parent[0]);
        const matched = getMatched(filterMenus, parent);

        if (!matched || matched.length === 0) return;

        const breadcrumbList = filterItem(matched);

        if (currentRoute.value.meta?.currentActiveMenu) {
          breadcrumbList.push({
            ...currentRoute.value,
            name: currentRoute.value.meta?.title || currentRoute.value.name,
          });
        }
        routes.value = breadcrumbList;
      });

      function getMatched(menus, parent) {
        const metched = [];
        menus.forEach((item) => {
          if (parent.includes(item.path)) {
            metched.push({
              ...item,
              name: item.meta?.title || item.name,
            });
          }
          if (item.children?.length) {
            metched.push(...getMatched(item.children, parent));
          }
        });
        return metched;
      }

      function filterItem(list) {
        let resultList = filter(list, (item) => {
          const { meta, name } = item;
          if (!meta) {
            return !!name;
          }
          const { title, hideBreadcrumb, hideMenu } = meta;
          if (!title || hideBreadcrumb || hideMenu) {
            return false;
          }
          return true;
        }).filter((item) => !item.meta?.hideBreadcrumb || !item.meta?.hideMenu);

        return resultList;
      }

      function handleClick(route, paths, e) {
        e?.preventDefault();
        const { children, redirect, meta } = route;

        if (children?.length && !redirect) {
          e?.stopPropagation();
          return;
        }
        if (meta?.carryParam) {
          return;
        }

        const go = useGo();
        if (redirect && isString(redirect)) {
          go(redirect);
        } else {
          let goPath = '';
          if (paths.length === 1) {
            goPath = paths[0];
          } else {
            const ps = paths.slice(1);
            const lastPath = ps.pop() || '';
            goPath = `${lastPath}`;
          }
          goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
          go(goPath);
        }
      }

      function hasRedirect(routes, route) {
        if (routes.indexOf(route) === routes.length - 1) {
          return false;
        }
        return true;
      }

      return { routes, prefixCls, getShowBreadCrumbIcon, handleClick, hasRedirect };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-breadcrumb';

  .@{prefix-cls} {
    display: flex;
    padding: 0 8px;
    align-items: center;

    .ant-breadcrumb-link {
      .anticon {
        margin-right: 4px;
        margin-bottom: 2px;
      }
    }

    &--light {
      .ant-breadcrumb-link {
        color: @breadcrumb-item-normal-color;

        a {
          color: rgba(0, 0, 0, 0.65);

          &:hover {
            color: @primary-color;
          }
        }
      }

      .ant-breadcrumb-separator {
        color: @breadcrumb-item-normal-color;
      }
    }

    &--dark {
      .ant-breadcrumb-link {
        color: rgba(255, 255, 255, 0.6);

        a {
          color: rgba(255, 255, 255, 0.8);

          &:hover {
            color: @white;
          }
        }
      }

      .ant-breadcrumb-separator,
      .anticon {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
</style>
