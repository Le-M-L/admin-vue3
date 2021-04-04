export const propsData = [
  {
    property: 'title',
    type: 'string',
    default: '-',
    optionValues: '-',
    explain: 'modal 标题',
  },
  {
    property: 'height',
    type: 'number',
    default: '-',
    optionValues: '-',
    explain: '固定 modal 的高度',
  },
  {
    property: 'minHeight',
    type: 'number',
    default: '-',
    optionValues: '-',
    explain: '设置 modal 的最小高度',
  },
  {
    property: 'draggable',
    type: 'boolean',
    default: 'true',
    optionValues: 'true/false',
    explain: '是否开启拖拽',
  },
  {
    property: 'useWrapper',
    type: 'boolean',
    default: ' true',
    optionValues: 'true/false',
    explain: '是否开启自适应高度，开启后会跟随屏幕变化自适应内容，并出现滚动条',
  },
  {
    property: 'wrapperFooterOffset',
    type: 'number',
    default: ' 0',
    optionValues: '-',
    explain:
      '开启是适应高度后，如果超过屏幕高度，底部和顶部会保持一样的间距，该参数可以用来缩小底部的间距',
  },
  {
    property: 'canFullscreen',
    type: 'boolean',
    default: 'true',
    optionValues: 'true/false',
    explain: '是否可以进行全屏',
  },
  {
    property: 'loading',
    type: 'boolean',
    default: 'false',
    optionValues: 'true/false',
    explain: 'modal loading 状态',
  },
  {
    property: 'showCancelBtn',
    type: 'boolean',
    default: 'true',
    optionValues: 'true/false',
    explain: '显示关闭按钮',
  },
  {
    property: 'showOkBtn',
    type: 'boolean',
    default: 'true',
    optionValues: 'true/false',
    explain: '显示确认按钮',
  },
  {
    property: 'helpMessage',
    type: 'string | string[]',
    default: '-',
    optionValues: '-',
    explain: '标题右侧提示文本',
  },
  {
    property: 'centered',
    type: 'boolean',
    default: 'false',
    optionValues: 'true/false',
    explain: '是否居中弹窗',
  },
  {
    property: 'cancelText',
    type: 'string',
    default: '关闭',
    optionValues: '-',
    explain: '关闭按钮文本',
  },
  {
    property: 'okText',
    type: 'string',
    default: '保存',
    optionValues: '-',
    explain: '确认按钮文本',
  },
  {
    property: 'closeFunc',
    type: '() => Promise<boolean>',
    default: '关闭函数',
    optionValues: '-',
    explain: '关闭前执行，返回 true 则不关闭',
  },
];
export const eventData = [
  {
    event: 'ok',
    callback: 'function(e)',
    explain: '点击确定回调',
  },
  {
    event: 'cancel',
    callback: 'function(e)',
    explain: '点击取消回调',
  },
  {
    event: 'visible-change',
    callback: '(visible:boolean)=>{}',
    explain: '打开或者关闭触发',
  },
];
export const baseHtml = ` 
// Modal.vue
// 注意 v-bind="$attrs"记得写
<template>
<BasicModal v-bind="$attrs" title="Modal Title" :helpMessage="['提示1', '提示2']">
Modal Info.
</BasicModal>
</template>
<script>
import { defineComponent } from 'vue';
import { BasicModal } from '@/components/comps/Modal';
export default defineComponent({
  components: { BasicModal },
});
</script>

// Page.vue
// 页面引用弹窗
<template>
    <BasicModal
    v-bind="$attrs"
    @register="register"
    title="Modal Title"
    :helpMessage="['提示1', '提示2']"
    >
    <a-button type="primary" @click="closeModal" class="mr-2">从内部关闭弹窗</a-button>

    <a-button type="primary" @click="setModalProps">从内部修改title</a-button>
    </BasicModal>
</template>
<script >
  import { defineComponent } from 'vue';
  import { BasicModal, useModal } from '@/components/comps/Modal';
  import Modal from './Modal.vue';
  export default defineComponent({
    components: { BasicModal },
    setup() {
        /**
         * register 用于注册 useModal，如果需要使用useModal提供的 api，必须将 register 传入组件的 onRegiste
         * openModal 用于打开/关闭弹窗  第二个参数与transferDrawerData作用一样
         * openModal(true,data) // true or false
         * 
         * setModalProps 用于更改 modal 的 props 参数因为 modal 内容独立成组件，如果在外部页面需要更改 props 可能比较麻烦，所以提供setModalProps 方便更改内部 modal 的 props
         * setModalProps(props); 具体参数请参考props
         * 
         * callback   //type: (data:any)=>void 回调函数用于接收 openModal 第二个参数传递的值
         * useModal((data: any) => {consoloe.log(data);});
         * /
        const [register, { openModal, setModalProps }] = useModal();
      return {
        register,
        closeModal,
        setModalProps: () => {
          setModalProps({ title: 'Modal New Title' });
        },
      };
    },
  });
</script>
`;

export const useModalInnerHtml = `
用于独立的 Modal 内部调用

<template>
  <div class="px-10">
    <Modal @register="register" />
  </div>
</template>
<script >
  import { defineComponent } from 'vue';
  import { useModalInner } from '@/components/comps/Modal';
  import Modal from './Modal.vue';
  export default defineComponent({
    components: { Modal },
    setup() {
        /**
         * closeModal 用于关闭弹窗
         * closeModal(); // true or false
         *
         * changeOkLoading 用于修改确认按钮的 loading 状态
         * changeOkLoading(true); // true or false
         *
         * changeLoading  用于修改 modal 的 loading 状态
         * changeLoading(true); // true or false
         *
         * setModalProps 用于更改 modal 的 props 参数因为 modal 内容独立成组件，如果在外部页面需要更改 props 可能比较麻烦，所以提供setModalProps 方便更改内部 modal 的 props
         * setModalProps(props); 具体参数请参考props
         * 
         * callback   //type: (data:any)=>void 回调函数用于接收 openModal 第二个参数传递的值
         * useModalInner((data: any) => {consoloe.log(data);});
         * 
         */
        const [register, { closeModal, changeOkLoading, changeLoading, setModalProps }] = useModalInner();
        return {
            register,
            closeModal,
            setModalProps: () => {
                setModalProps({ title: 'Modal New Title' });
            },
        };
    },
  });
</script>
`;
