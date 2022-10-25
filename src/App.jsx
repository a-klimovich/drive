// STYLES
import "antd/dist/antd.min.css";
import "./scss/index.scss";
// ROUTER
import Router from "./router";
import Provider from "./context/Provider";
// LAYOUT
import Layout, { Content } from "antd/lib/layout/layout";
import Header from "components/layout/Header";

const App = () => (
  <Layout className="App">
    <Provider>
      <Header />
      <Content>
        <Router />
      </Content>
    </Provider>
  </Layout>
);

export default App;
