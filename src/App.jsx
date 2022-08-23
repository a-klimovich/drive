// STYLES
import "antd/dist/antd.min.css";
import "./assets/scss/index.scss";
// ROUTER
import Router from "./utils/router";
import Provider from "./utils/context/Provider";
// LAYOUT
import Layout, { Content } from "antd/lib/layout/layout";
import Header from "./components/layout/Header";

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
