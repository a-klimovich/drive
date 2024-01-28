import StatuesChanger from './StatuesChanger';

export const columns = (isUserCanChangeStatus) => ([
  {
    dataIndex: 'title',
  },
  {
    title: 'Статус',
    render: ({ status, id }) => (
      <StatuesChanger
        status={status}
        id={id}
        isUserCanChangeStatus={isUserCanChangeStatus}
      />
    ),
    key: 'status',
  },
]);
