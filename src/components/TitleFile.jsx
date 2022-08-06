import { useNavigate } from 'react-router-dom';
// ANTD
import { Typography } from 'antd';
// COMPONENTS
import folderIcon from "./UI/icons/Folder";
import fileTypeIcon from "./UI/icons/Files";

const { Paragraph } = Typography;

const TitleFile = ({ data }) => {
  const navigate = useNavigate();

  const isFolder = data?.documents !== undefined;
  const isFolderEmpty = isFolder && data?.documents.length > 0;
  const { id, title, name, extension: fileType } = data;

  const goToFolder = (id) => () => {
    navigate(`/${id}`);
  };

  return (
    <div
      key={data?.id}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onClick={goToFolder(id)}
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
        { title || name }
      </Paragraph>
    </div>
  )
}

export default TitleFile;