import { Spin } from 'antd';

const Loader = ({ loading, children }) => {
  if (loading) {
    return (
      <div className={`page ${loading ? 'overlay' : ''}`}>
        <Spin className="spiner" size="large" spinning={loading} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { children }
    </>
  );
};

export default Loader;
