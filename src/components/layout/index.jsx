import { Outlet } from "react-router-dom";
// COMPONENTS
import Header from "components/layout/Header";
import ScrollToTop from 'components/UI/ScrollToTop';

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <ScrollToTop visibilityHeight={300}/>
    </>
  )
}

export default Layout;