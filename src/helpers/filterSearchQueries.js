const findActiveCheckBox = (list, search) => list.find((val) => val === search);

export default function filterSearchQueries(value, dateRange) {
  const { checkboxGroup = [], keywords = '', type = '' } = value;

  const startDate = dateRange.length > 0 && dateRange[0] !== ''
    ? `&updated_at__gte=${dateRange[0]}`
    : '';

  const endDate = dateRange.length > 0 && dateRange[1] !== ''
    ? `&updated_at__lt=${dateRange[1]}`
    : '';

  const keyText = keywords !== ''
    ? `&query=${keywords}`
    : '';

  const isRecommend = findActiveCheckBox(checkboxGroup, 'like') !== undefined
    ? '&liked=liked'
    : '';

  const isFollow = findActiveCheckBox(checkboxGroup, 'marked') !== undefined
    ? '&marked=marked'
    : '';

  const fileType = type !== null && type !== ''
    ? `&ext=${type}`
    : '';

  return `${keyText}${isRecommend}${isFollow}${fileType}${startDate}${endDate}`;
}
