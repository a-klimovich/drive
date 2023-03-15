import { Table } from 'antd';

const TableReports = ({ data, loading }) => {
  const columns = [
    {
      title: 'Дата отправки',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
    />
  );
};

export default TableReports;
