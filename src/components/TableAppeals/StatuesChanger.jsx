import Statuses from 'components/Statuses';
import { Space, Select } from 'antd';
import { useState } from 'react';

const StatuesChanger = ({
  status, id, handleStatus, isUserCanChangeStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const statusesList = {
    sent: 'Отправлено',
    accepted: 'Принято',
    rejected: 'Отклонено',
    seen: 'Просмотрено',
    in_job: 'В разработке',
  };

  console.log(currentStatus);

  return (
    <Space>
      <Statuses
        status={currentStatus}
      />

      {true && (
      <Select
        size="small"
        defaultValue={currentStatus}
        onChange={(value) => {
          setCurrentStatus(statusesList[value]);
          handleStatus(value, id);
        }}
        options={[
          { value: 'sent', label: 'Отправлено' },
          { value: 'accepted', label: 'Принято' },
          { value: 'rejected', label: 'Отклонено' },
          { value: 'seen', label: 'Просмотрено' },
          { value: 'in_job', label: 'В разработке' },
        ]}
      />
      )}
    </Space>
  );
};

export default StatuesChanger;
