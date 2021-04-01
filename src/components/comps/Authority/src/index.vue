<!--
 Access control component for fine-grained access control.
-->
<script>
  import { defineComponent, unref } from 'vue';

  import { PermissionModeEnum } from '@/config/enums/appEnum';
  import { useRootSetting } from '@/config/hooks/setting/useRootSetting';

  import { usePermission } from '@/config/hooks/web/usePermission';

  import { getSlot } from '@/config/utils/helper/jsxHelper';

  export default defineComponent({
    name: 'Authority',
    props: {
      /**
       * Specified role is visible
       * When the permission mode is the role mode, the value value can pass the role value.
       * When the permission mode is background, the value value can pass the code permission value
       * @default ''
       */
      value: {
        type: [Number, Array, String],
        default: '',
      },
    },
    setup(props, { slots }) {
      const { getPermissionMode } = useRootSetting();
      const { hasPermission } = usePermission();

      /**
       * Render role button
       */
      function renderRoleAuth() {
        const { value } = props;
        if (!value) {
          return getSlot(slots);
        }
        return hasPermission(value) ? getSlot(slots) : null;
      }

      //  Render coding button
      // Here only judge whether it is included, the specific implementation can be written according to the project logic
      function renderCodeAuth() {
        const { value } = props;
        if (!value) {
          return getSlot(slots);
        }
        return hasPermission(value) ? getSlot(slots) : null;
      }

      return () => {
        const mode = unref(getPermissionMode);
        // Role-based value control
        if (mode === PermissionModeEnum.ROLE) {
          return renderRoleAuth();
        }

        // Based on background role permission control
        if (mode === PermissionModeEnum.BACK) {
          return renderCodeAuth();
        }

        return getSlot(slots);
      };
    },
  });
</script>
