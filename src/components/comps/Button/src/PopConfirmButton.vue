<script>
  import { defineComponent, h, unref, computed } from 'vue';

  import { Popconfirm } from 'ant-design-vue';

  import BasicButton from './BasicButton.vue';

  import { propTypes } from '@/config/utils/propTypes';
  import { extendSlots } from '@/config/utils/helper/jsxHelper';
  import { omit } from 'lodash-es';

  import { useAttrs } from '@/config/hooks/core/useAttrs';

  export default defineComponent({
    name: 'PopButton',
    components: { Popconfirm, BasicButton },
    inheritAttrs: false,
    props: {
      size: propTypes.oneOf(['large', 'default', 'small']).def(),
      enable: propTypes.bool.def(true),
      okText: propTypes.string,
      cancelText: propTypes.string,
    },
    setup(props, { slots }) {
      const attrs = useAttrs();

      const getBindValues = computed(() => {
        const popValues = Object.assign(
          {
            okText: '确定',
            cancelText: '取消',
          },
          { ...props, ...unref(attrs) }
        );
        return popValues;
      });
      return () => {
        const values = omit(unref(getBindValues), 'icon');
        const Button = h(BasicButton, values, extendSlots(slots));
        if (!props.enable) {
          return Button;
        }

        return h(Popconfirm, values, { default: () => Button });
      };
    },
  });
</script>
