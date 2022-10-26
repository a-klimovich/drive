import { useState } from 'react';
import { Popover as AntPopover } from 'antd';

function Popover(props) {
  const {
    title,
    content,
    trigger = 'click',
    placement = 'bottomRight',
    children,
  } = props;

  const [visible, setVisible] = useState(false);

  // TODO: сделать крестик шоб закрывать модалку
  // const hide = () => {
  //   setVisible(false);
  // };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  return (
    <AntPopover
      placement={placement}
      title={title}
      content={content}
      trigger={trigger}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      { children }
    </AntPopover>
  );
}

export default Popover;
