import Statuses from 'components/Statuses';
import { Space, Select } from 'antd';
import { useState } from 'react';
import request from 'api/axios';
import { BASE_URL } from 'api/url';
import openNotification from 'components/Toasts';

const StatuesChanger = ({
  status, id, isUserCanChangeStatus,
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const statusesList = {
    sent: 'Отправлено',
    accepted: 'Принято',
    rejected: 'Отклонено',
    seen: 'Просмотрено',
    in_job: 'В разработке',
  };

  const handleStatus = (val, appealId) => {
    request
      .patch(`${BASE_URL.APIALS}/${appealId}`, { status: val })
      .then(() => {
        setCurrentStatus(statusesList[val]);
      })
      .catch((err) => {
        openNotification(false, err.message);
      });
  };

  return (
    <Space>
      <Statuses
        status={status}
      />

      {isUserCanChangeStatus && (
      <Select
        size="small"
        defaultValue={currentStatus}
        onChange={(value) => handleStatus(value, id)}
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
