import Container from '../helpers/Container';

export default function Header(props) {
  const { children } = props;

  return (
    <header>
      <Container>
        { children }
      </Container>
    </header>
  )
}