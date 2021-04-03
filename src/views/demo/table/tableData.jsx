export function getBasicColumns() {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 150,
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 150,
      sorter: true,
      defaultHidden: true,
    },
    {
      title: '开始时间',
      width: 120,
      sorter: true,
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      width: 120,
      sorter: true,
      dataIndex: 'endTime',
    },
  ];
}

export function getBaseApi() {
  return [
    {
      title: '属性',
      dataIndex: 'property',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '默认值',
      dataIndex: 'default',
    },
    {
      title: '可选值',
      dataIndex: 'optionValues',
    },
    {
      title: '说明',
      dataIndex: 'explain',
    },
  ];
}
export function getBaseApiProps() {
  return [
    {
      property: 'clickToRowSelect',
      type: 'boolean',
      default: 'true',
      optionValues: '-',
      explain: '点击行是否选中 checkbox 或者 radio。需要开启',
    },
    {
      property: 'sortFn',
      type: '(sortInfo: SorterResult<any>) => any',
      default: '-',
      optionValues: '-',
      explain: '自定义排序方法。见下方全局配置说明',
    },
    {
      property: 'filterFn',
      type: '(sortInfo: Partial<Recordable<string[]>>) => any',
      default: '-',
      optionValues: '-',
      explain: '自定义过滤方法。见下方全局配置说明',
    },
    {
      property: 'showTableSetting',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '显示表格设置工具',
    },
    {
      property: 'tableSetting',
      type: 'TableSetting{}',
      default: 'false',
      optionValues: '-',
      explain: '表格设置工具配置，见下方 TableSetting',
    },
    {
      property: 'striped',
      type: 'boolean',
      default: 'true',
      optionValues: '-',
      explain: '斑马纹',
    },
    {
      property: 'autoCreateKey',
      type: 'boolean',
      default: 'true',
      optionValues: '-',
      explain: '是否自动生成 key',
    },
    {
      property: 'emptyDataIsShowTable',
      type: 'boolean',
      default: 'true',
      optionValues: '-',
      explain: '在启用搜索表单的前提下，是否在表格没有数据的时候显示表格',
    },
    {
      property: 'summaryFunc',
      type: '(...arg) => any[]',
      default: '-',
      optionValues: '-',
      explain: '计算合计行的方法',
    },
    {
      property: 'canRowDrag',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '是否可拖拽行排序',
    },
    {
      property: 'canColDrag',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '是否可拖拽列',
    },
    {
      property: 'isTreeTable',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '是否树表  树形组件不能和序列号列同时存在',
      childred: [
        {
          property: 'isTreeTable',
          type: 'boolean',
          default: 'false',
          optionValues: '-',
          explain: '是否树表  树形组件不能和序列号列同时存在',
        },
      ],
    },
    {
      property: 'api',
      type: '(...arg: any) => Promise<any>',
      default: '-',
      optionValues: '-',
      explain: '请求接口，可以直接将src/api内的函数直接传入',
    },
    {
      property: 'beforeFetch',
      type: '(T)=>T',
      default: '-',
      optionValues: '-',
      explain: '请求之后对返回值进行处理',
    },
    {
      property: 'handleSearchInfoFn',
      type: '(T)=>T',
      default: '-',
      optionValues: '-',
      explain: '开启表单后，在请求之前处理搜索条件参数',
    },
    {
      property: 'fetchSetting',
      type: 'FetchSetting',
      default: '-',
      optionValues: '-',
      explain: '接口请求配置，可以配置请求的字段和响应的字段名，见下方全局配置说明',
    },
    {
      property: 'immediate',
      type: 'boolean',
      default: 'true',
      optionValues: '-',
      explain:
        '组件加载后是否立即请求接口，在 api 有传的情况下，如果为 false，需要自行使用 reload 加载表格数据',
    },
    {
      property: 'searchInfo',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '额外的请求参数',
    },
    {
      property: 'useSearchForm',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '使用搜索表单',
    },
    {
      property: 'formConfig',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '表单配置，参考表单的 Props',
    },
    {
      property: 'columns',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '表单列信息 BasicColumn[]',
    },
    {
      property: 'showIndexColumn',
      type: 'boolean',
      default: 'ture',
      optionValues: '-',
      explain: '是否显示序号列',
    },
    {
      property: 'indexColumnProps',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '序号列配置 BasicColumn',
    },
    {
      property: 'actionColumn',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '表格右侧操作列配置 BasicColumn',
    },
    {
      property: 'ellipsis',
      type: 'boolean',
      default: 'true',
      optionValues: '-',
      explain: '文本超过宽度是否显示...',
    },
    {
      property: 'canResize',
      type: 'boolean',
      default: 'true',
      optionValues: '-',
      explain: '是否可以自适应高度',
    },
    {
      property: 'clearSelectOnPageChange',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '切换页码是否重置勾选状态',
    },
    {
      property: 'resizeHeightOffset',
      type: 'number',
      default: '0',
      optionValues: '-',
      explain: '表格自适应高度计算结果会减去这个值',
    },
    {
      property: 'rowSelection',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '选择列配置',
    },
    {
      property: 'title',
      type: 'string',
      default: '-',
      optionValues: '-',
      explain: '表格标题',
    },
    {
      property: 'titleHelpMessage',
      type: 'string ｜ string[]',
      default: '-',
      optionValues: '-',
      explain: '表格标题右侧温馨提醒',
    },
    {
      property: 'maxHeight',
      type: 'number',
      default: '-',
      optionValues: '-',
      explain: '表格最大高度，超出会显示滚动条',
    },
    {
      property: 'dataSource',
      type: 'any[]',
      default: '-',
      optionValues: '-',
      explain: '表格数据，非 api 加载情况',
    },
    {
      property: 'bordered',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '是否显示表格边框',
    },
    {
      property: 'pagination',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '分页信息配置，为 null 不显示分页',
    },
    {
      property: 'loading',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '表格 loading 状态',
    },
    {
      property: 'scroll',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '参考官方文档 scroll',
    },
  ];
}

export function getBaseApiData() {
  return [
    {
      property: 'defaultHidden',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '默认隐藏，可在列配置显示',
    },
    {
      property: 'helpMessage',
      type: 'string｜string[]',
      default: '-',
      optionValues: '-',
      explain: '列头右侧帮助文本',
    },
    {
      property: 'edit',
      type: 'boolean',
      default: '-',
      optionValues: '-',
      explain: '是否开启单元格编辑',
    },
    {
      property: 'editRow',
      type: 'boolean',
      default: '-',
      optionValues: '-',
      explain: '是否开启行编辑',
    },
    {
      property: 'editable',
      type: 'boolean',
      default: 'false',
      optionValues: '-',
      explain: '是否处于编辑状态',
    },
    {
      property: 'editComponent',
      type: 'ComponentType',
      default: 'Input',
      optionValues: '-',
      explain: '编辑组件',
    },
    {
      property: 'editComponentProps',
      type: 'any',
      default: '-',
      optionValues: '-',
      explain: '对应编辑组件的 props',
    },
    {
      property: 'editRule',
      type: '((text: string, record: Recordable) => Promise<string>)',
      default: '-',
      optionValues: '-',
      explain: '对应编辑组件的表单校验',
    },
    {
      property: 'editValueMap',
      type: '(value: any) => string',
      default: '-',
      optionValues: '-',
      explain: '对应单元格值枚举',
    },
    {
      property: 'onEditRow',
      type: '（）=>void',
      default: '-',
      optionValues: '-',
      explain: '触发行编辑',
    },
    {
      property: 'format',
      type: 'CellFormat',
      default: '-',
      optionValues: '-',
      explain: '单元格格式化',
    },
  ];
}

export function getBaseApiEvent() {
  return [
    {
      property: 'fetch-success',
      type: 'Function({items,total})',
      default: '-',
      optionValues: '-',
      explain: '接口请求成功后触发',
    },
    {
      property: 'fetch-error',
      type: 'Function(error)',
      default: '-',
      optionValues: '-',
      explain: '错误',
    },
    {
      property: 'selection-change',
      type: 'Function({keys，rows})',
      default: '-',
      optionValues: '-',
      explain: '勾选事件触发',
    },
    {
      property: 'row-click',
      type: 'Function(record, index, event)',
      default: '-',
      optionValues: '-',
      explain: '行点击触发',
    },
    {
      property: 'row-dbClick',
      type: 'Function(record, index, event)',
      default: '-',
      optionValues: '-',
      explain: '行双击触发',
    },
    {
      property: 'row-contextmenu',
      type: 'Function(record, index, event)',
      default: '-',
      optionValues: '-',
      explain: '行右键触发',
    },
    {
      property: 'row-mouseenter',
      type: 'Function(record, index, event)',
      default: '-',
      optionValues: '-',
      explain: '行移入触发',
    },
    {
      property: 'row-mouseleave',
      type: 'Function(record, index, event)',
      default: '-',
      optionValues: '-',
      explain: '行移出触发',
    },
    {
      property: 'edit-end',
      type: 'Function(record, index, key, value )',
      default: '-',
      optionValues: '-',
      explain: '单元格编辑完成触发',
    },
    {
      property: 'edit-cancel',
      type: 'Function(record, index, key, value )',
      default: '-',
      optionValues: '-',
      explain: '单元格取消编辑触发',
    },
    {
      property: 'edit-row-end',
      type: 'Function()',
      default: '-',
      optionValues: '-',
      explain: '行编辑结束触发',
    },
  ];
}

export function getBaseApiSlots() {
  return [
    {
      property: 'tableTitle',
      type: '-',
      default: '-',
      optionValues: '-',
      explain: '表格顶部左侧区域',
    },
    {
      property: 'toolbar',
      type: '-',
      default: '-',
      optionValues: '-',
      explain: '表格顶部右侧区域',
    },
    {
      property: 'expandedRowRender',
      type: '-',
      default: '-',
      optionValues: '-',
      explain: '展开行区域',
    },
  ];
}

export function getBaseApiImg() {
  return [
    {
      property: 'imgList',
      type: 'string[]',
      default: '-',
      optionValues: '-',
      explain: '图片地址列表',
    },
    {
      property: 'size',
      type: 'number',
      default: '-',
      optionValues: '-',
      explain: '图片大小',
    },
  ];
}

export function getBasicShortColumns() {
  return [
    {
      title: 'ID',
      width: 150,
      dataIndex: 'id',
      sorter: true,
      sortOrder: 'ascend',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
  ];
}

export function getMultipleHeaderColumns() {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
      sorter: true,
      children: [
        {
          title: '编号',
          dataIndex: 'no',
          width: 120,
          filters: [
            { text: 'Male', value: 'male', children: [] },
            { text: 'Female', value: 'female', children: [] },
          ],
        },

        {
          title: '开始时间',
          dataIndex: 'beginTime',
          width: 120,
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          width: 120,
        },
      ],
    },
  ];
}

export function getCustomHeaderColumns() {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      // title: '姓名',
      dataIndex: 'name',
      width: 120,
      slots: { title: 'customTitle' },
    },
    {
      // title: '地址',
      dataIndex: 'address',
      width: 120,
      slots: { title: 'customAddress' },
      sorter: true,
    },

    {
      title: '编号',
      dataIndex: 'no',
      width: 120,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 120,
    },
  ];
}
const renderContent = ({ text, index }) => {
  const obj = {
    children: text,
    attrs: {},
  };
  if (index === 9) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
export function getMergeHeaderColumns() {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '地址',
      dataIndex: 'address',
      colSpan: 2,
      width: 120,
      sorter: true,
      customRender: ({ text, index }) => {
        const obj = {
          children: text,
          attrs: {},
        };
        if (index === 2) {
          obj.attrs.rowSpan = 2;
        }
        if (index === 3) {
          obj.attrs.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '编号',
      dataIndex: 'no',
      colSpan: 0,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
      customRender: renderContent,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 200,
      customRender: renderContent,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
      customRender: renderContent,
    },
  ];
}
export const getAdvanceSchema = (itemNumber = 6) => {
  const arr = [];
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    });
  }
  return arr;
};
export function getFormConfig() {
  return {
    labelWidth: 100,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field11`,
        label: `字段33`,
        component: 'Select',
        defaultValue: '1',
        slot: 'custom',
        componentProps: {
          options: [
            {
              label: '选项1',
              value: '1',
            },
            {
              label: '选项2',
              value: '2',
            },
          ],
        },
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
export function getBasicData() {
  const data = (() => {
    const arr = [];
    for (let index = 0; index < 10; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;
  })();
  return data;
}

export function getTreeTableData() {
  const data = (() => {
    const arr = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${index}`,
            name: 'John Brown',
            age: `1${index}`,
            no: `${index + 10}`,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
          },
        ],
      });
    }
    return arr;
  })();

  return data;
}
