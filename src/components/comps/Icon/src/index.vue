<template>
  <icon-font :type="icon" :class="[$attrs.class, 'anticon']" :style="getWrapStyle" />
</template>

<script>
  // @ts-nocheck

  import { defineComponent, computed } from 'vue';
  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { isString } from '@/config/utils/is';

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2400968_wxl7iqg33w.js',
  });
  export default defineComponent({
    name: 'DIcon',
    components: { IconFont },
    props: {
      // icon name
      icon: {
        type: String,
        default: null,
      },
      // icon color
      color: {
        type: String,
        default: null,
      },
      // icon size
      size: {
        type: [String, Number],
        default: 16,
      },
    },
    setup(props) {
      const getWrapStyle = computed(() => {
        const { size, color } = props;
        let fs = size;
        if (isString(size)) {
          fs = parseInt(size, 10);
        }
        return {
          fontSize: `${fs}px`,
          color,
          display: 'inline-flex',
        };
      });
      return {
        getWrapStyle,
      };
    },
  });
</script>

<style></style>
