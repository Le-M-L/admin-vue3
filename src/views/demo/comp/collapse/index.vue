<template>
  <PageWrapper title="卡片折叠示例">
    <CollapseContainer :loading="loading" class="mt-4" helpMessage="温馨提示" title="卡片折叠">
      content
    </CollapseContainer>

    <ExampleCode :html="html" />

    <PropsTable class="mt-4" :slotsData="slotsData" :propsData="propsData" />
  </PageWrapper>
</template>

<script>
  import { defineComponent, computed, ref } from 'vue';
  import { CollapseContainer } from '@/components/comps/Container/index';
  import ExampleCode from '@/components/exampleCode';
  import PropsTable from '@/components/PropsTable.vue';
  import { propsData, slotsData } from './propsData';
  import { PageWrapper } from '@/components/comps/Page';
  export default defineComponent({
    components: {
      CollapseContainer,
      PropsTable,
      ExampleCode,
      PageWrapper,
    },
    setup() {
      const loading = ref(true);

      setTimeout(() => {
        loading.value = false;
      }, 1000);

      const html = computed(() => {
        return `<template>
  <div class="m-4">
    <CollapseContainer :loading="loading" class="mt-4" helpMessage="温馨提示" title="卡片折叠"> content </CollapseContainer>
  </div>
</template>
<script>
  import { defineComponent } from 'vue';
  import { CollapseContainer } from '@/components/comps/Container/index';

  export default defineComponent({
    components: {
      CollapseContainer,
    },
    setup() {
        const loading = ref(true);
        setTimeout(() => {
        loading.value = false;
      }, 1000);
      return {loading};
    },
  });
< /script>`;
      });

      return {
        propsData,
        slotsData,
        html,
        loading,
      };
    },
  });
</script>

<style></style>
