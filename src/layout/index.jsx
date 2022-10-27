import { Outlet } from 'react-router-dom';
// COMPONENTS
import Header from 'layout/Header';
import ScrollToTop from 'components/UI/ScrollToTop';

function Layout() {
  return (
    <>
      <Header />

      <Outlet />

      <ScrollToTop visibilityHeight={300} />
    </>
  );
}

export default Layout;
