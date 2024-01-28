import StatuesChanger from './StatuesChanger';

export const columns = (handleStatus, isUserCanChangeStatus) => ([
  {
    dataIndex: 'title',
  },
  {
    title: 'Статус',
    // dataIndex: 'status',
    render: ({ status, id }) => (
      <StatuesChanger
        status={status}
        id={id}
        handleStatus={handleStatus}
        isUserCanChangeStatus={isUserCanChangeStatus}
      />
    ),
    key: 'status',
  },
]);
