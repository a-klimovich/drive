// ANTD
import { Typography } from 'antd';
// COMPONENTS
import folderIcon from "./UI/icons/folder";
import fileTypeIcon from "./UI/icons/files";

const { Paragraph } = Typography;

const TitleFile = ({ data }) => {
  const isFolder = data?.documents !== undefined;
  const isFolderEmpty = isFolder && data?.documents.length;
  const { title, extension: fileType } = data;

  const handleOpenFile = () => {
    const { id } = data;
    return `/api/folders/${id}`
  }

  return (
    <div
      key={data?.id}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onDoubleClick={handleOpenFile}
    >
      {isFolder ? folderIcon(isFolderEmpty, {
        style: {
          marginRight: '20px'
        }
      }) : fileTypeIcon(fileType, {
        style: {
          minWidth: '18px',
          marginRight: '16px',
          marginLeft: '4px'
        }
      })}
      <Paragraph
        style={{
          marginBottom: 0,
        }}
      >
        { title }
      </Paragraph>
    </div>
  )
}

export default TitleFile;