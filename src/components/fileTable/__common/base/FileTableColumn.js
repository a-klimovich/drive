const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Рекомендации',
    dataIndex: 'recommendations',
    sorter: {
      compare: (x, y) => { return (x.recommendations === y.recommendations) ? 0 : x.recommendations ? -1 : 1 },
      multiple: 2,
    },
  },
  {
    title: 'Избранное',
    dataIndex: 'favorite',
    sorter: {
      compare: (x, y) => { return (x.favorite === y.favorite) ? 0 : x.favorite ? -1 : 1 },
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