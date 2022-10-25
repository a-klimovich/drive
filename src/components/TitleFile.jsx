import { useNavigate } from 'react-router-dom';
// ANTD
import { Typography } from 'antd';
// COMPONENTS
import folderIcon from "components/UI/icons/folder";
import fileTypeIcon from "components/UI/icons/files";

const { Link, Text } = Typography;

const TitleFile = ({ data, isFolderItem = false }) => {
  const { id, title, name, extension: fileType, file } = data;
  
  const folderEmpty = data?.folders?.length === 0;
  const documentsEmpty = data?.documents?.length === 0;
  
  const navigate = useNavigate();
  const folderIsEmpty = () => (folderEmpty && documentsEmpty)

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
        folderIcon(folderIsEmpty(), {
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