import { useState } from 'react';
// ANTD
import { Typography } from 'antd';
// COMPONENTS
import folderIcon from "../../UI/icons/folder";
import fileTypeIcon from "../../UI/icons/files";
import 'antd/dist/antd.css';

const { Paragraph } = Typography;

const TitleFile = ({ data }) => {
  const [editableStr, setEditableStr] = useState(data?.title || '');

  const isFolder = data?.documents !== undefined;
  const isFolderEmpty = isFolder && data?.documents.length;
  const fileType = data?.extension;

  return (
    <div
      key={data?.id}
      style={{ display: 'flex', alignItems: 'center', cursor: 'pointer'}}
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
          maxWidth: '90%',
          overflow: 'hidden',
          marginBottom: 0,
        }}
        ellipsis={{
          rows: 1,
        }}
        editable={{
          onChange: setEditableStr,
          triggerType: 'text',
          maxLength: 150,
        }}
      >
        {editableStr}
      </Paragraph>
    </div>
  )
}

export default TitleFile;