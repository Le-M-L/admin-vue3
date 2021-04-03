<template>
  <div class="m-4">
    <CollapseContainer :loading="loading" class="mt-4" helpMessage="温馨提示" title="卡片折叠">
      content
    </CollapseContainer>
    <ExampleCode :html="html" />
    <PropsTable class="mt-4" :canResize="false" :dataSource="propsData" />
    <PropsTable class="mt-4" title="Slots" :canResize="false" :dataSource="slotsData" />
  </div>
</template>

<script>
  import { defineComponent, computed, ref } from 'vue';
  import { CollapseContainer } from '@/components/comps/Container/index';
  import ExampleCode from '@/components/exampleCode';
  import PropsTable from '@/components/PropsTable.vue';
  import { propsData, slotsData } from './propsData';
  export default defineComponent({
    components: {
      CollapseContainer,
      PropsTable,
      ExampleCode,
    },
    setup() {
      const loading = ref(true);

      setTimeout(() => {
        loading.value = false;
      }, 2000);

      const html = computed(() => {
        return `<template>
  <div class="m-4">
    <CollapseContainer> content </CollapseContainer>
  </div>
</template>
< /script>
`;
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
