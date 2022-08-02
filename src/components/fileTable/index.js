import React from "react";
// ANTD
import { Table, Breadcrumb, Space, Button } from "antd";
// COMPONENTS
import decorIcon from "../UI/icons/decors";
import CheckBoxRecommend from "../form/CheckBoxRecommend";
import CheckBoxFavorite from "../form/CheckBoxFavorite";
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
  key: `${element.id + '_' + element.title}`,
  name: <TitleFile data={element} />,
  recommendations: <CheckBoxRecommend
    defaultValue={element.marked_by_admin}
  />,
  favorite: <CheckBoxFavorite
    defaultValue={element.is_favourite}
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
