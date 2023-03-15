import { BackTop } from 'antd';

const ScrollToTop = ({ visibilityHeight }) => (
  <BackTop
    visibilityHeight={visibilityHeight}
  >
    <div className="back-to-top">UP</div>
  </BackTop>
);

export default ScrollToTop;
