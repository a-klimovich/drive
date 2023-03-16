import { memo } from 'react';
import { Tag } from 'antd';
import {
  SyncOutlined, CheckCircleOutlined, ClockCircleOutlined, QuestionOutlined,
} from '@ant-design/icons';

const Statuses = memo(({ status }) => {
  switch (status) {
    case 'Отправлен':
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Отправлен
        </Tag>
      );

    case 'Принят':
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          Принят
        </Tag>
      );

    case 'Исправить':
      return (
        <Tag icon={<ClockCircleOutlined />} color="warning">
          Исправить
        </Tag>
      );

    default:
      return (
        <Tag icon={<QuestionOutlined />} color="default">
          {status}
        </Tag>
      );
  }
});

export default Statuses;
