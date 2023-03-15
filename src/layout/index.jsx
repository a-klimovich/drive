import { Outlet } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop';
import Header from 'layout/Header';

const Layout = () => (
  <>
    <Header />

    <Outlet />

    <ScrollToTop visibilityHeight={300} />
  </>
);

export default Layout;
