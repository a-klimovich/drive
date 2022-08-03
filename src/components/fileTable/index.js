import React, { useEffect, useState } from "react";
// ANTD
import { Table, Breadcrumb } from "antd";
// HELPERS
import formattingListElements from '../../utils/helpers/formattingListElements';
// COMPONENTS
import Container from "../Container";
import EmptyTable from '../UI/EmptyTable';
// BASE
import columns from "./base/columns";
// AXIOS
import request from '../../utils/api/axios';

const { Item } = Breadcrumb;

const getData = () => request.get('/api');

export default function FileTable() {
  const [data, setData] = useState([]);
  
  const dataFolders = data?.Folders || [];
  const dataDocuments = data?.Documents || [];

  useEffect(() => {
    getData().then(res => setData(res?.data))
  }, [])

  const allElementsStoreList = [
    // ...formattingListElements(dataFolders),
    // ...formattingListElements(dataDocuments)
  ];

  return (
    <Container>
      <Breadcrumb separator=">">
        <Item>Home</Item>
        <Item href="">Application Center</Item>
        <Item href="">Application List</Item>
        <Item>An Application</Item>
      </Breadcrumb>

      <Table
        columns={columns}
        dataSource={allElementsStoreList}
        locale={{ emptyText: <EmptyTable description='По вашему запросу не найдено ни одного объекта' /> }}
        pagination={{
          position: ['none'],
        }}
      />
    </Container>
  );
};
