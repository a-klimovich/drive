import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Context from '../../utils/context/Context';
import { getFolderData } from '../../utils/hooks/getFolderData';
// ANTD
import { Table, Breadcrumb, Grid } from 'antd';
// HELPERS
import getFolderPath from '../../utils/helpers/getFolderPath';
// COMPONENTS
import EmptyTable from '../UI/EmptyTable';
// BASE
import { columns, columnsMobile } from './base/columns';
import folderItems from './base/folderItems';
import documentItems from './base/documentItems';

const { useBreakpoint } = Grid;

const Folders = () => {
  const { state, loaded } = useContext(Context);
  const { folderId } = useParams();
  const [currentFolder, setCurrentFolder] = useState({});
  const screens = useBreakpoint();
  
  console.log(screens);

  const actualContentRender = state?.filtered !== null ? state.filtered : state;

  useEffect(() => {
    getFolderData(actualContentRender, folderId) !== null
      ? setCurrentFolder(getFolderData(actualContentRender, folderId))
      : setCurrentFolder(getFolderData(currentFolder, folderId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualContentRender, folderId]);
  
  const dataSourceTable = [
    ...folderItems(currentFolder?.folders || []),
    ...documentItems(currentFolder?.documents || []),
  ];

  const folderPath = getFolderPath(actualContentRender, folderId);

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item >
          <Link to={`/`}>{'Moй кабинет'}</Link>
        </Breadcrumb.Item>

        {
          folderPath?.map((item) => (
            <Breadcrumb.Item key={`i${item.title}`} >
              <Link to={`/${ item.id }`}>{item.title}</Link>
            </Breadcrumb.Item>
          ))
        }
      </Breadcrumb>

      <Table
        loading={loaded}
        columns={!screens.md ? columnsMobile : columns}
        dataSource={dataSourceTable}
        locale={{
          emptyText: (
            <EmptyTable description="По вашему запросу не найдено ни одного объекта" />
          ),
        }}
        pagination={{
          position: ['none'],
          pageSize: 10,
        }}
      />
    </>
  );
};

export default Folders;
