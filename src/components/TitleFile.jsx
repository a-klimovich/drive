import { useNavigate } from 'react-router-dom';
// ANTD
import { Typography } from 'antd';
// COMPONENTS
import folderIcon from "./UI/icons/folder";
import fileTypeIcon from "./UI/icons/files";

const { Link, Text } = Typography;

const TitleFile = ({ data, isFolderItem = false }) => {
  const { id, title, name, extension: fileType, file } = data;
  
  const folderEmpty = data?.folders?.length;
  const documentsEmpty = data?.documents?.length;
  
  const navigate = useNavigate();
  const folderIsEmpty = () => (folderEmpty > 0 && documentsEmpty > 0)

  const goToFolder = (id) => () => {
    navigate(`/${id}`);
  };

  return isFolderItem ? (
    <div
      key={data?.id}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onClick={goToFolder(id)}
    >
      {
        folderIcon(!folderIsEmpty(), {
          style: {
            marginRight: '20px'
          }
        })
      }
      <Text>
        { title }
      </Text>
    </div>
  ) : (
    <Link
      key={data?.id}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      target='_blank'
      href={file}
    >
      {
        fileTypeIcon(fileType, {
          style: {
            minWidth: '18px',
            marginRight: '16px',
            marginLeft: '4px'
          }
        })
      }
      <Text>
        { name }
      </Text>
    </Link>
  )
}

export default TitleFile;