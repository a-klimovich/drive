import { FloatButton } from 'antd';
// import Layout, { Content } from 'antd/lib/layout/layout';
import Router from 'router';
import Provider from 'context/Provider';
import './scss/index.scss';

const App = () => (
  <Provider>
    <Router />

    <FloatButton.BackTop
      type="primary"
    />
  </Provider>
);

export default App;
