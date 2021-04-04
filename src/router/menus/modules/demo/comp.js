const menu = {
  orderNo: 30,
  menu: {
    name: '组件',
    path: '/comp',
    tag: {
      dot: true,
    },
    children: [
      {
        path: 'collapse',
        name: '卡片折叠',
      },
      {
        path: 'desc',
        name: '详情组件',
      },
      {
        path: 'table',
        name: '表格组件',
        children: [
          {
            path: 'basic',
            name: '基础表格',
          },
        ],
      },
      {
        path: 'modal',
        name: '弹窗组件',
      },
      {
        path: 'upload',
        name: '上传组件',
      },
      {
        path: 'loading',
        name: 'Loading',
      },
      {
        path: 'scroll',
        name: '滚动组件',
      },
      {
        path: 'verify',
        name: '验证组件',
        children: [
          {
            path: 'drag',
            name: '拖拽校验',
          },
          {
            path: 'rotate',
            name: '旋转校验',
          },
        ],
      },
      {
        path: 'countTo',
        name: '数字动画',
      },
      {
        path: 'timestamp',
        name: '相对时间',
      },
    ],
  },
};

export default menu;
