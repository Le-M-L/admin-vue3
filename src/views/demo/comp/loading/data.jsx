export const propsData = [
  {
    property: 'tip',
    type: 'string',
    default: '-',
    optionValues: '-',
    explain: '加载文本',
  },
  {
    property: 'size',
    type: 'default, small , large',
    default: 'default',
    optionValues: '-',
    explain: '大小',
  },
  {
    property: 'absolute',
    type: 'boolean',
    default: 'false',
    optionValues: '-',
    explain: '绝对定位，为 false 时可以全屏',
  },
  {
    property: 'loading',
    type: 'boolean',
    default: '-',
    optionValues: '-',
    explain: '当前加载状态',
  },
  {
    property: 'background',
    type: 'string',
    default: '-',
    optionValues: '-',
    explain: '背景色，',
  },
  {
    property: 'theme',
    type: `'dark' or 'light'`,
    default: 'light',
    optionValues: '-',
    explain: `背景色主题 ，当背景色不为空时使用背景色`,
  },
];

export const baseHtml = `<template>
<div class="p-4">
  <a-button class="my-4 mr-4" type="primary" @click="openCompFullLoading">全屏 Loading</a-button>

  <a-button class="my-4" type="primary" @click="openCompAbsolute"> 容器内 Loading </a-button>

  <Loading :loading="loading" :absolute="absolute" :tip="tip" />
</div>
</template>
<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { Loading } from '@/components/comps/Loading';

export default defineComponent({
  components: { Loading },
  setup() {
    const compState = reactive({
      absolute: false,
      loading: false,
      tip: '加载中...',
    });

    function openLoading(absolute) {
      compState.absolute = absolute;
      compState.loading = true;
      setTimeout(() => {
        compState.loading = false;
      }, 2000);
    }

    function openCompFullLoading() {
      openLoading(false);
    }

    function openCompAbsolute() {
      openLoading(true);
    }

    return {
      openCompFullLoading,
      openCompAbsolute,
      ...toRefs(compState),
    };
  },
});
</script>
`;

export const funHtml = `<template>
<div class="p-4">
  <a-button class="my-4 mr-4" type="primary" @click="openFnFullLoading">全屏 Loading</a-button>

  <a-button class="my-4" type="primary" @click="openFnWrapLoading"> 容器内 Loading </a-button>
</div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useLoading } from '@/components/comps/Loading';

export default defineComponent({
  components: { Loading },
  setup() {
    const wrapEl = ref(null);
    const [openFullLoading, closeFullLoading] = useLoading({
      tip: '加载中...',
    });

    const [openWrapLoading, closeWrapLoading] = useLoading({
      target: wrapEl,
      props: {
        tip: '加载中...',
        absolute: true,
      },
    });

    function openFnFullLoading() {
      openFullLoading();

      setTimeout(() => {
        closeFullLoading();
      }, 2000);
    }

    function openFnWrapLoading() {
      openWrapLoading();

      setTimeout(() => {
        closeWrapLoading();
      }, 2000);
    }

    return {
      openFnFullLoading,
      openFnWrapLoading,
      wrapEl,
    };
  },
});
</script>
`;

export const instructionHtml = `<template>
<div class="p-4" v-loading="loadingRef" loading-tip="加载中...">
  <a-button class="my-4 mr-4" type="primary" @click="openDirectiveLoading">打开指令Loading</a-button>
</div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const loadingRef = ref(false);

    function openDirectiveLoading() {
      loadingRef.value = true;
      setTimeout(() => {
        loadingRef.value = false;
      }, 2000);
    }

    return {
      openDirectiveLoading,
      loadingRef,
    };
  },
});
</script>`;
