// STYLES
import './scss/index.scss';
// ROUTER
import { BackTop } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Header from 'layout/Header';
import styles from './scss/components/back-top.module.scss';
import Router from './router';
import Provider from './context/Provider';
// LAYOUT

function App() {
  return (
    <Layout className="App">
      <Provider>
        <Header />

        <Content>
          <Router />
        </Content>

        <BackTop>
          <div className={styles.toTop}>👆</div>
        </BackTop>
      </Provider>
    </Layout>
  );
}

export default App;
