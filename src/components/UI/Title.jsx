export default function Title(props) {
  const { children } = props;

  return (
    <h2
      className="title"
    >
      { children }
    </h2>
  )
}