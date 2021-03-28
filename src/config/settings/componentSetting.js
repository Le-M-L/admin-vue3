// 用于在不修改组件的情况下，配置某些组件的通用配置

export default {
  // basic-table setting
  table: {
    // 表单接口请求通用配置
    // support xxx.xxx.xxx
    fetchSetting: {
      // 传递给后台的当前页面的字段名
      pageField: 'page',
      // 在后台显示的每个页面的编号字段名
      sizeField: 'pageSize',
      // 接口返回的表单数据的字段名
      listField: 'items',
      // 接口字段名返回的表的总数
      totalField: 'total',
    },
    // 可选择的页面数
    pageSizeOptions: ['10', '50', '80', '100'],
    // 默认一页显示数量
    defaultPageSize: 10,
    // 自定义通用排序函数
    defaultSortFn: (sortInfo) => {
      const { field, order } = sortInfo;
      return {
        // 将排序字段传递给后端您
        field,
        // 传递给后台asc/desc的排序方法
        order,
      };
    },
    // 自定义通用滤波功能
    defaultFilterFn: (data) => {
      return data;
    },
  },
  // 滚动条设置
  scrollbar: {
    // 是否使用本机滚动条
    // 打开后，菜单，模态，抽屉将改变弹出滚动条为本机
    native: false,
  },
};
