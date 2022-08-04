import React, { useEffect, useState } from "react";
// ANTD
import { Table, Breadcrumb } from "antd";
// HELPERS
import formattingListElements from '../../utils/helpers/formattingListElements';
// COMPONENTS
import EmptyTable from '../UI/EmptyTable';
// BASE
import columns from "./base/columns";
// AXIOS
import request from '../../utils/api/axios';

const { Item } = Breadcrumb;


// {
//   folders: [
//     {
//       id: 1,
//       folders: [],
//       documents: [],
//       createDate: '2022-07-27',
//       updateDate: "2022-07-27",
//       favourite: false, // сердечко
//       recommended: false, // звездочка
//       title: "Название папки",
//       // active: false - не понимаю что делает)
//     },
//   ],

//   documents: [
//     {
//       id: '1',
//       name: 'Document 1',
//       extension: 'DOC', // fileType: 'DOC'
//       filePath: "https://pnkbel.by/media/QLt17iJ.docx",
//       createDate: '2022-07-27',
//       updateDate: "2022-07-27",
//       favourite: false, // сердечко
//       recommended: false, // звездочка
//       title: "Название папки",
//       // active: true - не понимаю что делает)
//       // marked_by_admin: false - не понимаю что делает)
//     },
//   ],
// };

const getData = () => request.get('/api');

export default function FileTable() {
  const [data, setData] = useState([]);

  const dataFolders = data?.Folders || [];
  const dataDocuments = data?.Documents || [];

  useEffect(() => {
    getData().then(res => setData(res?.data))
  }, []);

  const allElementsStoreList = [
    ...formattingListElements(dataFolders),
    ...formattingListElements(dataDocuments)
  ];

  console.log(data);

  return (
    <>
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
    </>
  );
};
