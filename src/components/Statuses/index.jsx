import { memo } from 'react';
import { Tag } from 'antd';
import {
  SyncOutlined, CheckCircleOutlined, ClockCircleOutlined,
} from '@ant-design/icons';

const Statuses = memo(({ status }) => {
  switch (status) {
    case 'sent':
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Обрабатка
        </Tag>
      );

    case 'success':
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Подтверждено
        </Tag>
      );
    default:
      return (
        <Tag icon={<ClockCircleOutlined />} color="default">
          Ожидание
        </Tag>
      );
  }
});

export default Statuses;
