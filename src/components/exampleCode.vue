<template>
  <CollapseContainer class="mt-4" :unfold="false" :title="title">
    <pre v-highlightjs><code class="html" >{{ html }}</code></pre>
  </CollapseContainer>
</template>

<script>
  import { CollapseContainer } from '@/components/comps/Container/index';

  export default {
    components: {
      CollapseContainer,
    },
    props: {
      html: {
        type: String,
        default: '',
        require: true,
      },
      title: {
        type: String,
        default: '代码示例',
      },
    },
  };
</script>

<style></style>
