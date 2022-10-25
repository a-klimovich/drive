import { useState } from 'react';
// COMPONENTS
import decorIcon from "components/UI/icons/decors";

const CheckBoxFavorite = (props) => {
  const { defaultValue, style, onClick } = props;
  const [val, setVal] = useState(defaultValue);

  const onChange = () => {
    setVal(!val);
  }

  return (
    <label
      className="flex-align-center"
      style={{...style, width: 'fit-content', cursor: 'pointer'}}
    >
      <input 
        type="checkbox" 
        checked={val} 
        onChange={onChange}
        onClick={onClick}
      />
      {decorIcon("heart", {
        style: {
          width: '18px',
          height: '18px',
          fill: `${val ? '#FC4D4D' : '#B3B5B7'}`
        }
      })}
    </label>
  );
};

export default CheckBoxFavorite;
