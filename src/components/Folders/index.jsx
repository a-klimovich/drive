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
  const [paths, setPaths] = useState([]);

  const actualContentRender = state?.filtered
    ? state.filtered
    : state.base;

  useEffect(() => {
    getFolderData(actualContentRender, folderId) !== null
      ? setCurrentFolder(getFolderData(actualContentRender, folderId))
      : setCurrentFolder(getFolderData(currentFolder, folderId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualContentRender, folderId]);

  useEffect(() => {
    setPaths([{
      path: '/',
      name: 'Home',
    }])
  }, []);

  useEffect(() => {
    if (currentFolder?.id) {
      setPaths([
        ...paths,
        {
          path: `${currentFolder?.id}`,
          name: currentFolder?.title || currentFolder?.id,
        }
      ])
    }
  }, [currentFolder]);

  const clearBreadcrumbs = (current) => {
    console.log(current);
  };

  const dataSourceTable = [
    ...folderItems(currentFolder?.folders || []),
    ...documentItems(currentFolder?.documents || [])
  ];

  return (
    <>
      <Breadcrumb>
        {
          paths.map((item) => (
            <Breadcrumb.Item key={`${item.path}_i${item.name}`} >
              <Link to={item.path}>{item.name}</Link>
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>

      <Table
        loading={state.loaded}
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
