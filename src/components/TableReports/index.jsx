import { Table, Typography } from 'antd';
import Statuses from 'components/Statuses';

const { Link } = Typography;

const TableReports = ({ data, loading }) => {
  const columns = [
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Название',
      render: (record) => (<Link target="_blank" href={record.file}>{record.name}</Link>),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      render: (status) => (<Statuses status={status} />),
      key: 'status',
    },
    {
      title: 'Дата отправки',
      dataIndex: 'created_at',
      key: 'created_at',
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
