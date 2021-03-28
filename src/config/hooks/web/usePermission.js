// @ts-nocheck
import store from '@/store';

import { useTabs } from './useTabs';

import router, { resetRouter } from '@/router';
// import { RootRoute } from '@/router/routes';

import projectSetting from '@/config/settings/projectSetting';
import { PermissionModeEnum } from '@/config/enums/appEnum';

import { intersection } from 'lodash-es';
import { isArray } from '@/config/utils/is';

// User permissions related operations
export function usePermission() {
  /**
   * Change permission mode
   */
  async function togglePermissionMode() {
    store.commit('app/commitProjectConfigState', {
      permissionMode:
        projectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROLE
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }

  /**
   * Reset and regain authority resource information
   * @param id
   */
  async function resume(id) {
    store.commit('tab/commitClearCache');
    resetRouter();
    const routes = await store.dispatch('permission/buildRoutesAction', id);
    routes.forEach((route) => {
      router.addRoute(route);
    });
    store.commit('permission/commitLastBuildMenuTimeState');
    const { closeAll } = useTabs();
    closeAll();
  }

  /**
   * Determine whether there is permission
   */
  function hasPermission(value, def = true) {
    const permMode = projectSetting.permissionMode;
    if (PermissionModeEnum.ROLE === permMode) {
      // Visible by default
      if (!value) {
        return def;
      }
      if (!isArray(value)) {
        return store.getters['user/getRoleListState']?.includes(value);
      }
      return intersection(value, store.getters['user/getRoleListState']).length > 0;
    }
    if (PermissionModeEnum.BACK === permMode) {
      // Visible by default
      if (!value) {
        return def;
      }
      const allCodeList = store.getters['permission/getPermCodeListState'];
      if (!isArray(value)) {
        return allCodeList.includes(value);
      }
      return intersection(value, allCodeList).length > 0;
    }
    return true;
  }

  /**
   * Change roles
   * @param roles
   */
  async function changeRole(roles) {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROLE) {
      throw new Error(
        'Please switch PermissionModeEnum to ROLE mode in the configuration to operate!'
      );
    }
    if (!isArray(roles)) {
      roles = [roles];
    }
    store.commit('user/commitRoleListState', roles);
    await resume();
  }

  /**
   * Change menu
   */
  async function changeMenu(id) {
    // TODO The id passed in here is for testing. Actually, you don’t need to pass it. The id of the login person will be automatically obtained.
    resume(id);
  }

  return { changeRole, hasPermission, togglePermissionMode, changeMenu };
}
