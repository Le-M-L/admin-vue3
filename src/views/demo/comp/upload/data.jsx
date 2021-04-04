export const propsData = [
  {
    property: 'showPreviewNumber',
    type: 'boolean',
    default: 'true',
    optionValues: '-',
    explain: '是否显示预览数量',
  },
  {
    property: 'emptyHidePreview',
    type: 'boolean',
    default: 'false',
    optionValues: '-',
    explain: '没有上传文件时是否隐藏预览',
  },
  {
    property: 'helpText',
    type: 'string',
    default: '-',
    optionValues: '-',
    explain: '帮助文本',
  },
  {
    property: 'maxSize',
    type: 'number',
    default: '2',
    optionValues: '-',
    explain: '单个文件最大体积，单位 M',
  },
  {
    property: 'maxNumber',
    type: 'number',
    default: 'Infinity',
    optionValues: '-',
    explain: '最大上传数量，Infinity 则不限制',
  },
  {
    property: 'accept',
    type: 'string[]',
    default: '-',
    optionValues: '-',
    explain: `限制上传格式 ['.doc,','.docx','.xlsx']`,
  },
  {
    property: 'multiple',
    type: 'boolean',
    default: '-',
    optionValues: '-',
    explain: `开启多文件上传`,
  },
  {
    property: 'uploadParams',
    type: 'any',
    default: '-',
    optionValues: '-',
    explain: `上传携带的参数`,
  },
  {
    property: 'api',
    type: 'Fn',
    default: '-',
    optionValues: '-',
    explain: `上传接口，为上面配置的接口`,
  },
];

export const baseHtml = ` <template>
<div class="p-4">
  <BasicUpload :maxSize="20" :maxNumber="10" @change="handleChange" :api="uploadApi" />
</div>
</template>
<script >
import { defineComponent } from 'vue';
import { BasicUpload } from '@/components/comps/Upload';
import { uploadApi } from '@/api/sys/upload';

export default defineComponent({
  components: { BasicUpload },
  setup() {
    return {
      uploadApi,
      handleChange: (list: string[]) => {
        createMessage.info('已上传文件' + JSON.stringify(list));
      },
    };
  },
});
</script>
`;

export const formHtml = ` <template>
<div class="p-4">
  <BasicForm @register="register" class="my-5" />
</div>
</template>
<script >
import { defineComponent } from 'vue';
import { uploadApi } from '@/api/sys/upload';
import { BasicForm, useForm } from '@/components/comps/Form/index';
const schemas = [
  {
    field: 'field1',
    component: 'Upload',
    label: '字段1',
    colProps: {
      span: 8,
    },
    rules: [{ required: true, message: '请选择上传文件' }],
    componentProps: {
      api: uploadApi,
    },
  },
];
export default defineComponent({
  components: { BasicForm },
  setup() {
    const [register] = useForm({
      labelWidth: 120,
      schemas,
      actionColOptions: {
        span: 16,
      },
    });
    return {
      register
    };
  },
});
</script>
`;
