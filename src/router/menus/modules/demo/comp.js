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
    ],
  },
};

export default menu;
