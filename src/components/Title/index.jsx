import { Typography } from 'antd';

const { Title: AntdTitle } = Typography;

const Title = ({ children }) => (
  <AntdTitle
    leavel={2}
    style={{
      margin: '1rem 0 1rem 0',
    }}
  >
    {children}
  </AntdTitle>
);

export default Title;
