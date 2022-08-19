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
  const [paths, setPaths] = useState([{
    path: '/',
    name: 'Home',
  }]);

  const actualContentRender = state?.filtered
    ? state.filtered
    : state.base;

  useEffect(() => {
    getFolderData(actualContentRender, folderId) !== null
      ? setCurrentFolder(getFolderData(actualContentRender, folderId))
      : setCurrentFolder(getFolderData(currentFolder, folderId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualContentRender, folderId]);


  const getFolderPath = (data, id) => {
    if (data?.id === id) return [];
  
    if (data?.folders?.length === 0) return null;
  
    return data?.folders?.reduce((acc, folder) => {
      const path = getFolderPath(folder, id);
  
      if (path !== null) {
        return [folder, ...path];
      }
  
      return acc;
    }, []);
  };
  
  const folderPath = getFolderPath(actualContentRender, folderId);

  console.log("current page folders", folderPath?.slice(-1)[0]);
  console.log(
    "breadcrumbs",
    folderPath?.map(({ title }) => title)
  );

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
          pageSize: 100,
        }}
      />
    </>
  );
};

export default Folders;
