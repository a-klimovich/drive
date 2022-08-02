const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Рекомендации',
    dataIndex: 'recommendations',
    sorter: {
      compare: (x, y) => { return (x === y) ? 0 : x ? -1 : 1 },
      multiple: 2,
    },
  },
  {
    title: 'Избранное',
    dataIndex: 'favorite',
    sorter: {
      compare: (x, y) => { return (x === y) ? 0 : x ? -1 : 1 },
      multiple: 1,
    },
  },
  {
    title: 'Последнее изменение',
    dataIndex: 'date',
  },
  {
    title: '',
    dataIndex: 'control',
  },
];

export default columns;