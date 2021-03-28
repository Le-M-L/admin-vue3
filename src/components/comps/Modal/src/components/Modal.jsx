import { Modal } from 'ant-design-vue';
import { defineComponent, toRefs, unref } from 'vue';
import { basicProps } from '../props';
import { useModalDragMove } from '../hooks/useModalDrag';
import { useAttrs } from '@/config/hooks/core/useAttrs';
import { extendSlots } from '@/config/utils/helper/jsxHelper';

export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  setup(props, { slots }) {
    const { visible, draggable, destroyOnClose } = toRefs(props);
    const attrs = useAttrs();
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable,
    });

    return () => {
      const propsData = { ...unref(attrs), ...props };

      return <Modal {...propsData}>{extendSlots(slots)}</Modal>;
    };
  },
});
