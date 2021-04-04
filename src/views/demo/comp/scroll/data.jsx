export const eventData = [
  {
    event: 'getScrollWrap',
    callback: 'Function',
    explain: '获取滚动容器 el',
  },
  {
    event: 'scrollBottom',
    callback: 'Function',
    explain: '滚动到底部',
  },
  {
    event: 'scrollTo',
    callback: 'Function(to:number,duration = 500)',
    explain: '滚动到指定位置',
  },
];

export const slotsData = [
  {
    property: 'default',
    type: '-',
    default: '-',
    optionValues: '-',
    explain: '默认区域',
  },
];

export const baseHtml = `<template>
  <div class="scroll-wrap">
    <ScrollContainer class="mt-4">
      <ul class="p-3">
        <template v-for="index in 100" :key="index">
          <li class="p-2" :style="{ border: '1px solid #eee' }">
            {{ index }}
          </li>
        </template>
      </ul>
    </ScrollContainer>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { ScrollContainer } from '@/components/comps/Container/index';

export default defineComponent({
  components: { ScrollContainer },
});
</script>
<style lang="less" scoped>
.scroll-wrap {
  width: 50%;
  height: 300px;
  background: #fff;
}
</style>
`;

export const funHtml = `<template>
  <div class="my-4">
    <a-button @click="scrollTo(100)" class="mr-2"> 滚动到100px位置 </a-button>
    <a-button @click="scrollTo(800)" class="mr-2"> 滚动到800px位置 </a-button>
    <a-button @click="scrollTo(0)" class="mr-2"> 滚动到顶部 </a-button>
    <a-button @click="scrollBottom()" class="mr-2"> 滚动到底部 </a-button>
  </div>
  <div class="scroll-wrap">
    <ScrollContainer class="mt-4" ref="scrollRef">
      <ul class="p-3">
        <template v-for="index in 100" :key="index">
          <li class="p-2" :style="{ border: '1px solid #eee' }">
            {{ index }}
          </li>
        </template>
      </ul>
    </ScrollContainer>
  </div>
</template>
<script>
import { defineComponent, ref, unref } from 'vue';
import { ScrollContainer } from '@/components/comps/Container/index';

export default defineComponent({
  components: { ScrollContainer },
  setup() {
    const scrollRef = ref(null);
    const getScroll = () => {
      const scroll = unref(scrollRef);
      if (!scroll) {
        throw new Error('scroll is Null');
      }
      return scroll;
    };

    function scrollTo(top) {
      getScroll().scrollTo(top);
    }
    function scrollBottom() {
      getScroll().scrollBottom();
    }
    return {
      scrollTo,
      scrollRef,
      scrollBottom,
    };
  },
});
</script>
<style lang="less" scoped>
.scroll-wrap {
  width: 50%;
  height: 300px;
  background: #fff;
}
</style>

`;
