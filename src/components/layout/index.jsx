import { Outlet } from "react-router-dom";
// COMPONENTS
import Container from "../Container";
import Header from "./Header";
import ScrollToTop from '../UI/ScrollToTop';

const Layout = () => {
  return (
    <>
      <Header />

      <Container>
        <Outlet />
      </Container>

      <ScrollToTop visibilityHeight={300}/>
    </>
  )
}

export default Layout;