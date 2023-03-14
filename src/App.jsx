// STYLES
import './scss/index.scss';

// ROUTER
import { FloatButton } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Header from 'layout/Header';
import Router from './router';
import Provider from './context/Provider';

const App = () => (
  <Layout className="App">
    <Provider>
      <Header />

      <Content>
        <Router />
      </Content>

      <FloatButton.BackTop
        type="primary"
      />
    </Provider>
  </Layout>
);

export default App;
