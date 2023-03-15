import { Typography } from 'antd';

const { Title: AntdTitle } = Typography;

const Title = ({ children }) => (
  <h1
    style={{
      margin: '1rem 0 1rem 0',
    }}
  >
    <AntdTitle leavel={2}>{children}</AntdTitle>
  </h1>
);

export default Title;
