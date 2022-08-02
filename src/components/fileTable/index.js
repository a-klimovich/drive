import React from "react";
// ANTD
import { Table, Breadcrumb } from "antd";
// COMPONENTS
import decorIcon from "../UI/icons/decors";
import Checkbox from "../form/CheckBox";
import Container from "../helpers/Container";
// BASE
import columns from "./__common/base/FileTableColumn";
import TitleFile from "./__common/TitleFile";
import APIIS from "./__common/base/APIIS";

const { Item } = Breadcrumb;

const newApiData = [
  ...APIIS.Folders,
  ...APIIS.Documents
];

const data = [];

newApiData.map((element) => (data.push({
  name: <TitleFile data={element} />,
  recommendations: <Checkbox
    label={decorIcon("star")}
    value={true}
  />,
  favorite: <Checkbox
    label={decorIcon("heart")}
    value={true}
  />,
  date: element.updated_at || '-',
  view: decorIcon("eyes"), // TODO: link to download ore view file
  download: decorIcon("download"), // TODO: link to download ore view file
})));

export default function FileTable() {
  
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
        dataSource={data}
        pagination={{
          position: ['none'],
        }}
      />
    </Container>
  );
};
