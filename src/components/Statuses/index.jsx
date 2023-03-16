import { memo } from 'react';
import { Tag } from 'antd';
import {
  SyncOutlined, CheckCircleOutlined, ClockCircleOutlined,
} from '@ant-design/icons';

const Statuses = memo(({ status }) => {
  switch (status) {
    case 'sent':
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Отправлен
        </Tag>
      );

    case 'accepted':
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Принят
        </Tag>
      );
    default:
      return (
        <Tag icon={<ClockCircleOutlined />} color="default">
          Исправить
        </Tag>
      );
  }
});

export default Statuses;
