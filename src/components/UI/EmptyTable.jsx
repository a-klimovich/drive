import decorIcon from './icons/decors';
import { Typography, Space } from 'antd';

const { Paragraph } = Typography;

const EmptyTable = ({ description }) => {
  return (
    <div
      className='empty-table flex-center-all'
    >
      <Space
        direction='vertical'
      >
        <div>
          {decorIcon('sadFace')}
        </div>
        
        <Paragraph
          className='flex-center-all'
          style={{
            height: '100px',
            fontWeight: 700,
          }}
        >
          { description }
        </Paragraph>
      </Space>
    </div>
  )
}

export default EmptyTable;