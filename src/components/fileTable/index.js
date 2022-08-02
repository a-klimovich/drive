import React from "react";
// ANTD
import { Table, Breadcrumb, Space, Button } from "antd";
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

const onClick = () => {
  console.log(12 + 'click');
}

newApiData.map((element) => (data.push({
  key: `${element.id + '_' + element.title}`,
  name: <TitleFile data={element} />,
  recommendations: <Checkbox
    label={decorIcon("star")}
    onChange={onClick}
    value={element.is_favourite}
  />,
  favorite: <Checkbox
    onChange={onClick}
    value={element.marked_by_admin}
  />,
  date: element.updated_at || '-',
  control: <Space>
    <Button
      type="text"
      htmlType="button"
    >
      {decorIcon("eyes")}
    </Button>

    <Button
      type="text"
      htmlType="button"
    >
      {decorIcon("download")}
    </Button>
  </Space>,
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
