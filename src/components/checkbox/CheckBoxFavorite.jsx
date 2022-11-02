import { useState } from 'react';
// COMPONENTS
import decorIcon from 'components/UI/icons/decors';

function CheckBoxFavorite(props) {
  const { defaultValue, onClick } = props;
  const [val, setVal] = useState(defaultValue);

  const onChange = () => setVal(!val);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className="checkbox-favorite flex-align-center"
    >
      <input
        type="checkbox"
        checked={val}
        onChange={onChange}
        onClick={onClick}
      />
      {decorIcon('heart', {
        style: {
          width: '18px',
          height: '18px',
          fill: `${val ? '#FC4D4D' : '#B3B5B7'}`,
        },
      })}
    </label>
  );
}

export default CheckBoxFavorite;
