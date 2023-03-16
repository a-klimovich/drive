import { Table } from 'antd';
import { columns } from './config';

const TableReports = ({ data, loading }) => (
  <Table
    columns={columns}
    dataSource={data}
    loading={loading}
  />
);

export default TableReports;
