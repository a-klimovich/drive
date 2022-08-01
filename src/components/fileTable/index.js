import React from "react";
// COMPONENTS
import fileTypeIcon from "../UI/icons/files";
import decorIcon from "../UI/icons/decors";
import folderIcon from "../UI/icons/folder";
import Checkbox from "../form/CheckBox";
// ANTD
import { Table } from "antd";
// base
import columns from "./__common/base/FileTableColumn";
import APIIS from "./__common/base/APIIS";

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
  name: <>{fileTypeIcon(element.extension)} {element.title}</>,
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
