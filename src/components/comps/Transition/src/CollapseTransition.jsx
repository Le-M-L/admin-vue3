// @ts-nocheck
// collapse 展开折叠
import { defineComponent } from 'vue';
import { getSlot } from '@/config/utils/helper/jsxHelper';
// import { createJavascriptTransition } from './CreateTransition';
import ExpandTransition from './ExpandTransition.vue';

// export const ExpandTransition = createJavascriptTransition(
//   'expand-transition',
//   ExpandTransitionGenerator()
// );
export default defineComponent({
  name: 'CollapseTransition',
  setup(_, { slots }) {
    return () => <ExpandTransition>{() => getSlot(slots)}</ExpandTransition>;
  },
});
