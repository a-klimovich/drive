
export const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    onFilter: (value, record) => record.name.includes(value),
    sorter: (a, b) => a.name.length - b.name.length,
    width: '100%',
  },
  {
    title: 'Рекомендации',
    dataIndex: 'recommendations',
    sorter: (a, b) => (a.filterRecommended === b.filterRecommended)? 0 : a? -1 : 1,
    sortDirections: ['ascend'],
  },
  // 'ascend''descend'
  {
    title: 'Избранное',
    dataIndex: 'favorite',
    sorter: (a, b) => (a.filterFavorite === b.filterFavorite)? 0 : a? -1 : 1,
    sortDirections: ['ascend'],
  },
  {
    title: 'Последнее изменение',
    dataIndex: 'date',
    width: 200,
  },
  {
    title: '',
    dataIndex: 'control',
  },
];

export const columnsMobile = [
  {
    title: 'Название',
    dataIndex: 'name',
    onFilter: (value, record) => record.name.includes(value),
    sorter: (a, b) => a.name.length - b.name.length,
    width: '100%',
  },
  {
    dataIndex: 'info',
  }
];
