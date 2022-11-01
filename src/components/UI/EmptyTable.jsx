import { Typography, Space } from 'antd';
import decorIcon from './icons/decors';

const { Paragraph } = Typography;

function EmptyTable({ description }) {
  return (
    <div
      className="empty-table flex-center-all"
    >
      <Space
        direction="vertical"
      >
        <div>
          {decorIcon('sadFace')}
        </div>

        <Paragraph
          className="flex-center-all"
          style={{
            height: '100px',
            fontWeight: 700,
          }}
        >
          { description }
        </Paragraph>
      </Space>
    </div>
  );
}

export default EmptyTable;
