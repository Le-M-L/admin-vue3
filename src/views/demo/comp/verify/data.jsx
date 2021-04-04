export const propsData = [
  {
    property: 'value',
    type: 'boolean',
    default: '-',
    optionValues: '-',
    explain: '是否通过',
  },
  {
    property: 'text',
    type: 'string',
    default: '请按住滑块拖动',
    optionValues: '-',
    explain: '未拖动时候显示文字',
  },
  {
    property: 'successText',
    type: 'string',
    default: '验证通过',
    optionValues: '-',
    explain: '验证成功后显示文本',
  },
  {
    property: 'height',
    type: 'string｜number',
    default: '50',
    optionValues: '-',
    explain: '高度',
  },
  {
    property: 'width',
    type: 'string｜number',
    default: '260',
    optionValues: '-',
    explain: '宽度',
  },
  {
    property: 'circle',
    type: 'boolean',
    default: 'false',
    optionValues: '-',
    explain: `是否圆角`,
  },
  {
    property: 'wrapStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: `外层容器样式`,
  },
  {
    property: 'contentStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: `主体内容样式`,
  },
  {
    property: 'barStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: `bar 样式`,
  },
  {
    property: 'actionStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: `拖拽按钮样式`,
  },
];
export const eventData = [
  {
    event: 'resume',
    callback: 'Function',
    explain: '还原初始值',
  },
];
export const baseHtml = `<template>
<div class="flex justify-center p-4 items-center bg-gray-700">
      <BasicDragVerify ref="el1" @success="handleSuccess" />
      <a-button type="primary" class="ml-2" @click="handleBtnClick(el1)"> 还原 </a-button>
    </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { BasicDragVerify } from '@/components/comps/Verify/index';
import { useMessage } from '@/config/hooks/web/useMessage';
export default defineComponent({
  components: { BasicDragVerify },
  setup() {
    const el1 = ref(null);
    const { createMessage } = useMessage();
    function handleSuccess(data) {
      const { time } = data;
      createMessage.success('校验成功,耗时'+ time +'秒');
    }
    function handleBtnClick(elRef) {
      if (!elRef) {
        return;
      }
      elRef.resume();
    }
    return {
      el1,
      handleSuccess,
      handleBtnClick,
    };
  },
});
</script>
`;
export const rotateData = [
  {
    property: 'src',
    type: 'string',
    default: '-',
    optionValues: '-',
    explain: '图片地址',
  },
  {
    property: 'imgWidth',
    type: 'number',
    default: '-',
    optionValues: '-',
    explain: '图片宽度',
  },
  {
    property: 'imgWrapStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: '图片外层容器样式',
  },
  {
    property: 'minDegree',
    type: 'number',
    default: '-',
    optionValues: '-',
    explain: '最小旋转角度',
  },
  {
    property: 'maxDegree',
    type: 'number',
    default: '-',
    optionValues: '-',
    explain: '最大旋转角度',
  },
  {
    property: 'diffDegree',
    type: 'number',
    default: '-',
    optionValues: '-',
    explain: '误差角度',
  },
  {
    property: 'value',
    type: 'boolean',
    default: '-',
    optionValues: '-',
    explain: '是否通过',
  },
  {
    property: 'text',
    type: 'string',
    default: '请按住滑块拖动',
    optionValues: '-',
    explain: '未拖动时候显示文字',
  },
  {
    property: 'successText',
    type: 'string',
    default: '验证通过',
    optionValues: '-',
    explain: '验证成功后显示文本',
  },
  {
    property: 'height',
    type: 'string｜number',
    default: '40',
    optionValues: '-',
    explain: '高度',
  },
  {
    property: 'width',
    type: 'string｜number',
    default: '260',
    optionValues: '-',
    explain: '宽度',
  },
  {
    property: 'circle',
    type: 'boolean',
    default: 'false',
    optionValues: '-',
    explain: '是否圆角',
  },
  {
    property: 'wrapStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: '外层容器样式',
  },
  {
    property: 'contentStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: '主体内容样式',
  },
  {
    property: 'barStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: 'bar 样式',
  },
  {
    property: 'actionStyle',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: '拖拽按钮样式',
  },
];

export const rotateEventData = [
  {
    event: 'resume',
    callback: 'Function',
    explain: '还原初始值',
  },
];

export const rotateHtml = `<template>
  <div class="flex justify-center p-4 items-center bg-gray-700">
    <RotateDragVerify :src="img" ref="el" @success="handleSuccess" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { RotateDragVerify } from '@/components/comps/Verify/index';
import img from '@/assets/images/header.jpg';

export default defineComponent({
  components: { RotateDragVerify, PageWrapper },
  setup() {
    const handleSuccess = () => {
      console.log('success!');
    };
    return {
      handleSuccess,
      img,
    };
  },
});
</script>
<style lang="less" scoped>
.bg-gray-700 {
  background: #4a5568;
}
</style>
`;
