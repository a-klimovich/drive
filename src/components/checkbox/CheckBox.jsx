const Checkbox = (props) => {
  const { label, value, onChange, style } = props;
  return (
    <label
      className="flex-align-center"
      style={style}
    >
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

export default Checkbox;
