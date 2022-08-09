import { useState } from "react";

const Checkbox = (props) => {
  const { defaultValue, style, children } = props;
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
      {children}
    </label>
  );
};

export default Checkbox;
