import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Context from '../../utils/context/Context';
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
// URL
import { BASE_URL } from '../../utils/api/url';
// AXIOS
import request from '../../utils/api/axios';

const { useBreakpoint } = Grid;

const Folders = () => {
  const { state, loaded, setLoaded, setState } = useContext(Context);
  const { folderId } = useParams();
  const [currentFolder, setCurrentFolder] = useState({});
  const screens = useBreakpoint();
  const folderPath = getFolderPath(state, folderId);
  const actualContentRender = state.filtered ? state.filtered : state;

  const refreshStateNewGet = () => {
    request.get(BASE_URL.API)
      .then((response) => {
        if (response?.statusText === 'OK') {
          setLoaded(true);
          setState({
            ...response.data,
            filtered: null
          });
        }
      })
      .catch((error) => {
        console.Error(error);
      })
      .finally(() => setLoaded(false));
  }

  const handleFavoriteFolder = (val) => () => {
    request.patch(`${BASE_URL.FOLDERS}/${val?.id}`)
      .then(() => refreshStateNewGet())
      .catch((error) => {
        console.log(error.message);
      })
  };

  const handleFavoriteDocs = (val) => () => {
    request
      .patch(`${BASE_URL.DOCUMENTS}/${val?.id}`, {
        is_favourite: true,
      })
      .then(() => refreshStateNewGet())
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (folderPath?.length) {
      setCurrentFolder(folderPath[folderPath?.length - 1]);
    } else {
      setCurrentFolder(actualContentRender)
    }
  }, [folderPath]);

  const dataSourceTable = [
    ...folderItems(currentFolder?.folders || [], handleFavoriteFolder),
    ...documentItems(currentFolder?.documents || [], handleFavoriteDocs),
  ];

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={`/`}>{'Moй кабинет'}</Link>
        </Breadcrumb.Item>

        {folderPath?.map((item) => {
          return (
            <Breadcrumb.Item key={`i${item?.title}`}>
              <Link to={`/${item?.id}`}>
                {item?.title}
              </Link>
            </Breadcrumb.Item>
          );
        })}
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
          pageSize: 100,
        }}
      />
    </>
  );
};

export default Folders;
