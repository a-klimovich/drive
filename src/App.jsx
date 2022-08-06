// STYLES
import "antd/dist/antd.min.css";
import "./assets/scss/index.scss";
// ROUTER
import Router from "./utils/router";
import Provider from "./utils/context/Provider";
// LAYOUT
import Layout, { Content } from "antd/lib/layout/layout";
import Header from "./components/layout/Header";
import Container from "./components/Container";

const App = () => (
  <Layout className="App">
    <Header />
    <Content>
      <Container>
        <Provider>
          <Router />
        </Provider>
      </Container>
    </Content>
  </Layout>
);

export default App;
