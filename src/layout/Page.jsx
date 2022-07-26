import { Spin } from 'antd';

function Page(props) {
  const { children, loading } = props;

  return (
    <div className={`page ${loading ? 'overlay' : ''}`}>
      { children }

      <Spin className="spiner" size="large" spinning={loading} />
    </div>
  );
}

export default Page;
