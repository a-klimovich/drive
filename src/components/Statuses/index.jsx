import { memo } from 'react';
import { Tag } from 'antd';
import {
  SyncOutlined, CheckCircleOutlined, WarningOutlined, QuestionOutlined,
} from '@ant-design/icons';

const Statuses = memo(({ status }) => {
  switch (status) {
    case 'Отправлено':
      return (
        <Tag icon={<SyncOutlined />} color="cyan">
          Отправлено
        </Tag>
      );

    case 'Просмотрено':
      return (
        <Tag icon={<CheckCircleOutlined />} color="orange">
          Просмотрено
        </Tag>
      );
    case 'Принято':
      return (
        <Tag icon={<CheckCircleOutlined />} color="green">
          Принято
        </Tag>
      );

    case 'В разработке':
      return (
        <Tag icon={<SyncOutlined spin />} color="yellow">
          В разработке
        </Tag>
      );
    case 'Отклонено':
      return (
        <Tag icon={<WarningOutlined />} color="blue">
          Отклонено
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
