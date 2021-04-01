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
    'https://picsum.photos/id/66/346/216',
    'https://picsum.photos/id/67/346/216',
    'https://picsum.photos/id/68/346/216',
  ];
  export default defineComponent({
    components: { PageWrapper, ImagePreview },
    setup() {
      return { imgList };
    },
  });
</script>
