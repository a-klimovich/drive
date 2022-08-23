import { Outlet } from "react-router-dom";
// COMPONENTS
import Header from "./Header";
import ScrollToTop from '../UI/ScrollToTop';

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