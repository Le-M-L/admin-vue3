export const propsData = [
  {
    property: 'title',
    type: 'string',
    default: '-',
    optionValues: '-',
    explain: '标题',
  },
  {
    property: 'canExpan',
    type: 'boolean',
    default: 'true',
    optionValues: '-',
    explain: '是否可以展开',
  },
  {
    property: 'helpMessage',
    type: 'string｜[]',
    default: '-',
    optionValues: '-',
    explain: '标题右侧温馨提醒',
  },
  {
    property: 'triggerWindowResize',
    type: 'boolean',
    default: 'false',
    optionValues: '-',
    explain: '展开收缩的时候是否触发 window.resize',
  },
  {
    property: 'loading',
    type: 'boolean',
    default: 'false',
    optionValues: '-',
    explain: 'loading 状态',
  },
  {
    property: 'unfold',
    type: 'boolean',
    default: 'true',
    optionValues: '-',
    explain: '初始是否为展开状态 canExpan为true时才生效',
  },
];

export const slotsData = [
  {
    property: 'title',
    type: '-',
    default: '-',
    optionValues: '-',
    explain: '自定义标题',
  },
  {
    property: 'action',
    type: '-',
    default: '-',
    optionValues: '-',
    explain: '自定义右侧操作按钮',
  },
  {
    property: 'default	',
    type: '-',
    default: '-',
    optionValues: '-',
    explain: '默认区域',
  },
];
