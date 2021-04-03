<template>
  <CollapseContainer class="mt-4" title="代码示例">
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
    },
  };
</script>

<style></style>
