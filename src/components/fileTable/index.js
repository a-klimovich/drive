import React, { useMemo } from "react";
// COMPONENTS
// import fileTypeIcone from "./components/UI/icons/files";
import fileTypeIcone from "../UI/icons/files";
import decorIcon from "../UI/icons/decore";
import folderIcon from "../UI/icons/folder";
import Checkbox from "../form/CheckBox";
// ANTD
import { Table } from "antd";
// base
import columns from "./base/FileTableColumn";
import APIIS from "./base/APIIS";

const data = [];

APIIS.Folders.map((element) => (data.push({
  name: <>{folderIcon(true)} {element.title}</>,
  recommendations: <Checkbox
    label={decorIcon("star", {
      style: {
        width: '18px',
        height: '18px',
        fill: `${false ? '#FFC107' : '#B3B5B7'}`
      }
    })}
    value={true}
  />,
  favorite: <Checkbox
    label={decorIcon("heart", {
      style: {
        width: '18px',
        height: '18px',
        fill: `${false ? '#FFC107' : '#B3B5B7'}`
      }
    })}
    value={true}
  />,
  date: element.updated_at || '',
})));

APIIS.Documents.map((element) => (data.push({
  name: <>{fileTypeIcone(element.extension)} {element.title}</>,
  recommendations: <Checkbox
    label={decorIcon("star", {
      style: {
        width: '18px',
        height: '18px',
        fill: `${false ? '#FFC107' : '#B3B5B7'}`
      }
    })}
    value={true}
  />,
  favorite: <Checkbox
    label={decorIcon("heart", {
      style: {
        width: '18px',
        height: '18px',
        fill: `${false ? '#FFC107' : '#B3B5B7'}`
      }
    })}
    value={true}
  />,
  date: element.updated_at || '',
})));

export default function FileTable() {
  
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        position: ['none'],
      }}
    />
  );
};
