import { Tag } from 'ant-design-vue';
import { ErrorTypeEnum } from '@/config/enums/exceptionEnum';

export function getColumns() {
  return [
    {
      dataIndex: 'type',
      title: 'tableColumnType',
      width: 80,
      customRender: ({ text }) => {
        const color =
          text === ErrorTypeEnum.VUE
            ? 'green'
            : text === ErrorTypeEnum.RESOURCE
            ? 'cyan'
            : text === ErrorTypeEnum.PROMISE
            ? 'blue'
            : ErrorTypeEnum.AJAX
            ? 'red'
            : 'purple';
        return <Tag color={color}>{() => text}</Tag>;
      },
    },
    {
      dataIndex: 'url',
      title: 'URL',
      width: 200,
    },
    {
      dataIndex: 'time',
      title: 'tableColumnDate',
      width: 160,
    },
    {
      dataIndex: 'file',
      title: 'tableColumnFile',
      width: 200,
    },
    {
      dataIndex: 'name',
      title: 'Name',
      width: 200,
    },
    {
      dataIndex: 'message',
      title: 'tableColumnMsg',
      width: 300,
    },
    {
      dataIndex: 'stack',
      title: 'tableColumnStackMsg',
    },
  ];
}

export function getDescSchema() {
  return getColumns().map((column) => {
    return {
      field: column.dataIndex,
      label: column.title,
    };
  });
}
