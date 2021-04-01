<template>
  <div :class="prefixCls">
    <PreviewGroup>
      <slot v-if="!imageList || $slots.default"></slot>
      <template v-else>
        <template v-for="item in getImageList" :key="item.src">
          <Image v-bind="item">
            <template #placeholder v-if="item.placeholder">
              <Image v-bind="item" :src="item.placeholder" :preview="false" />
            </template>
          </Image>
        </template>
      </template>
    </PreviewGroup>
  </div>
</template>
<script>
  import { defineComponent, computed } from 'vue';

  import { Image } from 'ant-design-vue';
  import { useDesign } from '@/config/hooks/web/useDesign';
  import { propTypes } from '@/config/utils/propTypes';
  import { isString } from '@/config/utils/is';

  export default defineComponent({
    name: 'ImagePreview',
    components: {
      Image,
      PreviewGroup: Image.PreviewGroup,
    },
    props: {
      functional: propTypes.bool,
      imageList: {
        type: Array,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('image-preview');

      const getImageList = computed(() => {
        const { imageList } = props;
        if (!imageList) {
          return [];
        }
        return imageList.map((item) => {
          if (isString(item)) {
            return {
              src: item,
              placeholder: false,
            };
          }
          return item;
        });
      });

      return {
        prefixCls,
        getImageList,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-image-preview';

  .@{prefix-cls} {
    .ant-image {
      margin-right: 10px;
    }

    .ant-image-preview-operations {
      background: rgba(0, 0, 0, 0.4);
    }
  }
</style>
