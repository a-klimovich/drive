import Layout, { Content } from 'antd/lib/layout/layout';
import Header from 'components/Header';

const BaseTemplate = ({ children }) => (
  <Layout>
    <Header />
    <Content>{children}</Content>
  </Layout>
);

export default BaseTemplate;
