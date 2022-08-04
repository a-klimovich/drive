export default function Title(props) {
  const { children } = props;

  return (
    <h2
      className="title"
      style={{fontWeigth: '700', marginBottom: '0'}}
    >
      { children }
    </h2>
  )
}