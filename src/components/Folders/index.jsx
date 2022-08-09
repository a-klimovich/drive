import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Context from "../../utils/context/Context";
import { getFolderData } from "../../utils/hooks/getFolderData";
// ANTD
import { Table, Breadcrumb } from "antd";
// COMPONENTS
import EmptyTable from '../UI/EmptyTable';
// BASE
import columns from "./base/columns";
import folderItems from "./base/folderItems";
import documentItems from "./base/documentItems";

const Folders = () => {
  const { state } = useContext(Context);
  const { folderId } = useParams();
  const [currentFolder, setCurrentFolder] = useState({});

  useEffect(() => {
    if(getFolderData(state, folderId) !== null) {
      setCurrentFolder(getFolderData(state, folderId));
    } else {
      setCurrentFolder(getFolderData(currentFolder, folderId))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, folderId]);

  const dataSourceTable = [
    ...folderItems(currentFolder?.folders || []),
    ...documentItems(currentFolder?.documents || [])
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/${folderId}`}>{currentFolder?.title || currentFolder?.name}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Table
        columns={columns}
        dataSource={dataSourceTable}
        locale={{ emptyText: <EmptyTable description='По вашему запросу не найдено ни одного объекта' /> }}
        pagination={{
          position: ['none'],
        }}
      />
    </>
  );
};

export default Folders;
