import { useState } from 'react';
// COMPONENTS
import decorIcon from 'components/UI/icons/decors';

function CheckBoxRecommend(props) {
  const { defaultValue } = props;
  const [val, setVal] = useState(defaultValue || false);

  const onChange = () => {
    setVal(!val);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className="flex-align-center"
    >
      <input type="checkbox" checked={val} onChange={onChange} />
      {decorIcon('star', {
        style: {
          width: '18px',
          height: '18px',
          fill: `${val ? '#FFC107' : '#B3B5B7'}`,
        },
      })}
    </label>
  );
}

export default CheckBoxRecommend;
