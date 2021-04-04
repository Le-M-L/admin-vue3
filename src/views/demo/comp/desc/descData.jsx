import { computed } from 'vue';

export const descData = [
  {
    property: 'title',
    type: 'string',
    default: '-',
    optionValues: '-',
    explain: '标题',
  },
  {
    property: 'size',
    type: 'string',
    default: 'small',
    optionValues: '-',
    explain: '大小',
  },
  {
    property: 'bordered',
    type: 'boolean',
    default: 'true',
    optionValues: '-',
    explain: '是否展示边框',
  },
  {
    property: 'column',
    type: 'Number, Object',
    default: ' Object	{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }',
    optionValues: '-',
    explain: '一行的 DescriptionItems 数量',
  },
  {
    property: 'useCollapse',
    type: 'boolean',
    default: ' -',
    optionValues: '-',
    explain: '是否包裹 CollapseContainer 组件',
  },
  {
    property: 'collapseOptions',
    type: 'Object',
    default: ' -',
    optionValues: '-',
    explain: 'CollapseContainer 组件属性',
  },
  {
    property: 'schema',
    type: 'DescItem[]',
    default: ' -',
    optionValues: '-',
    explain: '详情项配置，请展开 schema 配置',
    children: [
      {
        property: 'field',
        type: 'string',
        default: '-',
        optionValues: '-',
        explain: '字段名',
      },
      {
        property: 'label',
        type: 'string',
        default: '-',
        optionValues: '-',
        explain: '标签名',
      },
      {
        property: 'labelMinWidth',
        type: 'number',
        default: '-',
        optionValues: '-',
        explain: 'label 最小宽度',
      },
      {
        property: 'contentMinWidth',
        type: 'number',
        default: '-',
        optionValues: '-',
        explain: 'content 最小宽度',
      },
      {
        property: 'labelStyle',
        type: 'any',
        default: '-',
        optionValues: '-',
        explain: 'label 样式',
      },
      {
        property: 'span',
        type: 'number',
        default: '-',
        optionValues: '-',
        explain: '和并列数量',
      },
      {
        property: 'show',
        type: '(data)=>boolean',
        default: '-',
        optionValues: '-',
        explain: '动态判断当前组件是否显示',
      },
      {
        property: 'render',
        type: '(val: string, data: any)=>VNode | undefined | Element | string | number;',
        default: '-',
        optionValues: '-',
        explain: '自定义渲染 content',
      },
    ],
  },
  {
    property: 'data',
    type: 'any',
    default: ' -',
    optionValues: '-',
    explain: '数据源',
  },
];

export const baseHtml = computed(() => {
  return ` <template>
  <Description
        title="基础示例"
        :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
        :column="3"
        :data="mockData"
        :schema="schema"
      />
  </template>
  <script>
  import { defineComponent } from 'vue';
  import { Description } from '@/components/comps/Description/index';
  const mockData = {
    username: 'test',
    nickName: 'VB',
    age: 25,
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return  data.username + '-' + curVal ;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];
  export default defineComponent({
    components: { Description },
    setup() {
    
      return { mockData, schema,};
    },
  });
  < /script>
  `;
});

export const verticalHtml = computed(() => {
  return ` <template>
  <Description
      class="mt-4"
      title="垂直示例"
      layout="vertical"
      :collapseOptions="{ canExpand: true, helpMessage: 'help me' }"
      :column="2"
      :data="mockData"
      :schema="schema"
      :useCollapse="true"
    />
  </template>
  <script>
  import { defineComponent } from 'vue';
  import { Description } from '@/components/comps/Description/index';
  const mockData = {
    username: 'test',
    nickName: 'VB',
    age: 25,
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return  data.username + '-' + curVal ;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];
  export default defineComponent({
    components: { Description },
    setup() {
    
      return { mockData, schema,};
    },
  });
  < /script>
  `;
});

export const useHtml = computed(() => {
  return ` <template>
  <Description @register="register" class="mt-4" />
  </template>
  <script>
  import { defineComponent } from 'vue';
  import { Description, useDescription } from '@/components/comps/Description/index';
  const mockData = {
    username: 'test',
    nickName: 'VB',
    age: 25,
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return  data.username + '-' + curVal ;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];
  export default defineComponent({
    components: { Description },
    setup() {
      const [register] = useDescription({
        title: 'useDescription',
        data: mockData,
        schema: schema,
      });
      return { mockData, schema, register};
    },
  });
  < /script>
  `;
});

export const useBorderHtml = computed(() => {
  return ` <template>
  <Description @register="register" class="mt-4" />
  </template>
  <script>
  import { defineComponent } from 'vue';
  import { Description, useDescription } from '@/components/comps/Description/index';
  const mockData = {
    username: 'test',
    nickName: 'VB',
    age: 25,
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema = [
    {
      field: 'username',
      label: '用户名',
    },
    {
      field: 'nickName',
      label: '昵称',
      render: (curVal, data) => {
        return  data.username + '-' + curVal ;
      },
    },
    {
      field: 'phone',
      label: '联系电话',
    },
    {
      field: 'email',
      label: '邮箱',
    },
    {
      field: 'addr',
      label: '地址',
    },
  ];
  export default defineComponent({
    components: { Description },
    setup() {
      const [register] = useDescription({
        title: '无边框',
        bordered: false,
        data: mockData,
        schema: schema,
      });
      return { mockData, schema, register};
    },
  });
  < /script>
  `;
});
