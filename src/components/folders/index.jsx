import React, {
  useContext, useEffect, useState,
} from 'react';
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
import BreadCrumbs from 'components/BredCrumbs';
// BASE
import { columns, columnsMobile } from './base/columns';
import folderItems from './base/folderItems';
import documentItems from './base/documentItems';

const { useBreakpoint } = Grid;

function Folders() {
  const {
    state, loaded, setLoaded,
  } = useContext(Context);
  const screens = useBreakpoint();
  const { folderId } = useParams();
  const [totalCount, setTotalCount] = useState(0);
  const [currentFolderData, setCurrentFolderData] = useState({});
  // paginatoin
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const { breadcrumbs, elements } = currentFolderData;
  const { request_path } = state;

  const breadcrumbsPathsToRender = breadcrumbs?.length > 0
    ? [...breadcrumbs, currentFolderData]
    : getFolderPath(state.elements, folderId);

  useEffect(() => {
    setTotalCount(state?.elements_count);

    if (folderId === undefined && request_path?.params === '') {
      setCurrentFolderData(state);
    }

    if (request_path && request_path?.base !== BASE_URL.API && folderId === undefined) {
      setLoaded(true);

      request.get(`${request_path?.base}${request_path?.params}&limit=${limit}&offset=${offset}`)
        .then((res) => {
          const { data } = res;

          setCurrentFolderData(data);
          setTotalCount(data.elements_count);
        })
        .finally(() => setLoaded(false));
    }

    if (folderId) {
      setLoaded(true);

      request
        .get(`${BASE_URL.FOLDERS}${folderId}/?limit=${limit}&offset=${offset}`)
        .then((res) => {
          const { data } = res;

          setCurrentFolderData(data);
          setTotalCount(data.count);
        })
        .finally(() => setLoaded(false));
    }
  }, [folderId, offset, limit, state]);

  useEffect(() => setOffset(0), [folderId]);

  const handleChangePagination = (page, pageSize) => {
    const ofsetNotLastPage = pageSize * (page - 1);
    setLimit(pageSize);

    if (page === 1) {
      setOffset(0);
    } else {
      setOffset(ofsetNotLastPage);
    }
  };

  const handleFavorite = (val, baseUrl) => () => {
    request
      .patch(`${baseUrl}/${val?.id}/`, {
        is_favourite: !val.is_favourite,
      })
      .then(() => {
        setLoaded(true);
      })
      .finally(() => setLoaded(false));
  };

  const dataSourceTable = [
    ...folderItems(elements?.folders || [], handleFavorite),
    ...documentItems(elements?.documents || [], handleFavorite),
  ];

  return (
    <>
      <BreadCrumbs folderPath={breadcrumbsPathsToRender || []} currentId={folderId} />

      <Table
        loading={loaded}
        columns={!screens.md ? columnsMobile : columns}
        dataSource={dataSourceTable}
        locale={{
          emptyText: <EmptyTable description="По вашему запросу не найдено ни одного объекта" />,
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
}

export default Folders;
