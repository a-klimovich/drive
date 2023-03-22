import { Typography } from 'antd';
import Statuses from 'components/Statuses';
import config from 'config';
import dayjs from 'dayjs';

const { Link } = Typography;

export const columns = [
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
    render: (date) => dayjs(date).format(config.dateFormat),
    dataIndex: 'created_at',
    key: 'created_at',
  },
];
