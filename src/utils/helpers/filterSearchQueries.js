const findActiveCheckBox = (list, search) => list.find((val) => val === search);

export default function filterSearchQueries (value, dateRange) {
  const { checkboxGroup = [], keywords = '', type = '' } = value;
  console.log('FC', dateRange);

  const startDate = dateRange.length > 0 && dateRange[0] !== ''
    ? `&updated_at__gte=${dateRange[0]}`
    : '';

  const endDate = dateRange.length > 0 && dateRange[1] !== ''
    ? `&updated_at__lt=${dateRange[1]}`
    : '';

  const keyText = keywords !== ''
    ? `&title=${keywords}`
    : '';

  const isRecommend = findActiveCheckBox(checkboxGroup, 'marked') !== undefined
    ? `&liked=${true}`
    : '';

  const isFollow = findActiveCheckBox(checkboxGroup, 'like') !== undefined
    ? `&marked=${true}`
    : '';

  const fileType = type !== ''
    ? `&ext=${type}`
    : '';

  return `${keyText}${isRecommend}${isFollow}${fileType}${startDate}${endDate}`;
};