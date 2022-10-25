import { useState } from 'react';
// COMPONENTS
import decorIcon from "components/UI/icons/decors";

const CheckBoxRecommend = (props) => {
  const { defaultValue, style } = props;
  const [val, setVal] = useState(defaultValue || false);

  const onChange = () => {
    setVal(!val);
  }

  return (
    <label
      className="flex-align-center"
      style={{...style, width: 'fit-content', cursor: 'pointer'}}
    >
      <input type="checkbox" checked={val} onChange={onChange} />
      {decorIcon("star", {
        style: {
          width: '18px',
          height: '18px',
          fill: `${val ? '#FFC107' : '#B3B5B7'}`
        }
      })}
    </label>
  );
};

export default CheckBoxRecommend;
