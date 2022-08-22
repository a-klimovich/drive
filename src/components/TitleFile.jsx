import { useNavigate } from 'react-router-dom';
// ANTD
import { Typography } from 'antd';
// COMPONENTS
import folderIcon from "./UI/icons/folder";
import fileTypeIcon from "./UI/icons/files";

const { Paragraph, Link } = Typography;

const TitleFile = ({ data, isFolderItem = false }) => {
  const navigate = useNavigate();

  const folderEmpty = data?.folders?.length;
  const documentsEmpty = data?.documents?.length;

  const folderIsEmpty = () => (folderEmpty > 0 && documentsEmpty > 0)

  const { id, title, name, extension: fileType, file } = data;

  const goToFolder = (id) => () => {
    navigate(`/${id}`);
  };

  return isFolderItem ? (
    <div
      key={data?.id}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
      onDoubleClick={goToFolder(id)}
    >
      {
        folderIcon(!folderIsEmpty(), {
          style: {
            marginRight: '20px'
          }
        })
      }
      <Paragraph
        style={{
          marginBottom: 0,
        }}
      >
        { title || name }
      </Paragraph>
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
      <Paragraph
        style={{
          marginBottom: 0,
        }}
      >
        { title || name }
      </Paragraph>
    </Link>
  )
}

export default TitleFile;