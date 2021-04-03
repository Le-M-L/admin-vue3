<template>
  <PageWrapper title="图片预览示例">
    <ImagePreview :imageList="imgList" />
  </PageWrapper>
</template>
<script>
  import { defineComponent } from 'vue';
  import { ImagePreview } from '@/components/comps/Preview/index';
  import { PageWrapper } from '@/components/comps/Page';

  const imgList = [
    require('@/assets/images/1.jpg'),
    require('@/assets/images/2.jpg'),
    require('@/assets/images/3.jpg'),
  ];
  export default defineComponent({
    components: { PageWrapper, ImagePreview },
    setup() {
      return { imgList };
    },
  });
</script>
