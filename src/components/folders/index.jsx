import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// ANTD
import { Table, Grid } from 'antd';
// URL
import { BASE_URL } from 'api/url';
// AXIOS
import request from 'api/axios';
// HELPERS
import Context from 'context/Context';
import getFolderPath from 'helpers/getFolderPath';
// COMPONENTS
import EmptyTable from 'components/UI/EmptyTable';
import BreadCrumbs from 'components/BredCrumbs'
// BASE
import { columns, columnsMobile } from './base/columns';
import folderItems from './base/folderItems';
import documentItems from './base/documentItems';
import { useMemo } from 'react';

const { useBreakpoint } = Grid;

const Folders = () => {
  const { state, loaded, setLoaded } = useContext(Context);
  const { folderId } = useParams();
  const [folder, setFolder] = useState({});
  // paginatoin
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount] = useState(600); // TODO: add total BACKEND;

  const screens = useBreakpoint();

  const folderPath = useMemo(() => getFolderPath(state, folderId), [state, folderId]);
  const actualContentRender = state.filtered ? state.filtered : state;

  useEffect(() => {
    if (folderId) {
      setLoaded(true);

      request.get(`${BASE_URL.FOLDERS}/${folderId}/?limit=${limit}&offset=${offset}`)
        .then((res) => {
          setFolder(res?.data)
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => setLoaded(false));
    }

    if (folderId === undefined) {
      setFolder(actualContentRender)
    }
  }, [folderId, setLoaded, actualContentRender, offset, limit])

  const handleChangePagination = (page, pageSize) => {
    setLimit(pageSize);

    if (page === 1) {
      setOffset(0);
    } else {
      setOffset(pageSize * page);
    }
  }

  const handleFavorite = (val, baseUrl) => () => {
    request.patch(`${baseUrl}/${val?.id}`)
      .then(() => {
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setLoaded(false));
  };

  const dataSourceTable = [
    ...folderItems(folder?.folders || [], handleFavorite),
    ...documentItems(folder?.documents || [], handleFavorite),
  ];

  return (
    <>
      <BreadCrumbs
        folderPath={folderPath}
      />

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
          defaultCurrent: 1,
          hideOnSinglePage: true,
          position: ['bottomCenter'],
          defaultPageSize: limit,
          total: totalCount,
          onChange: handleChangePagination,
        }}
      />
    </>
  );
};

export default Folders;
