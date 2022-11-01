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
  const { folderId } = useParams();
  const [totalCount, setTotalCount] = useState(0);
  const [elements, setElements] = useState({});
  const [breadcrumbsList, setBreadcrumbsList] = useState([]);
  // paginatoin
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const screens = useBreakpoint();

  const folderPath = getFolderPath(state, folderId);

  useEffect(() => {
    setTotalCount(state?.elements_count);
    setElements(state?.elements);

    if (folderId) {
      setLoaded(true);

      request
        .get(`${BASE_URL.FOLDERS}/${folderId}/?limit=${limit}&offset=${offset}`)
        .then((res) => {
          const { data } = res;

          setElements(data?.elements);
          setBreadcrumbsList(data?.breadcrumbs);
          setTotalCount(data.count);
        })
        .finally(() => setLoaded(false));
    }
  }, [folderId, setLoaded, offset, limit, state]);

  useEffect(() => {
    setOffset(0);
  }, [folderId]);

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
      .patch(`${baseUrl}/${val?.id}`, {
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

  const pathRender = breadcrumbsList?.length > 0 ? [{
    title: breadcrumbsList[0],
    id: folderId,
  }] : folderPath;

  console.log(state);

  return (
    <>
      <BreadCrumbs folderPath={pathRender || []} currentId={folderId} />

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
