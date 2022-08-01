import React from "react";
// COMPONENTS
import decorIcon from "../UI/icons/decors";
import Checkbox from "../form/CheckBox";
import Container from "../helpers/Container";
// ANTD
import { Table } from "antd";
// BASE
import columns from "./__common/base/FileTableColumn";
import TitleFile from "./__common/TitleFile";
import APIIS from "./__common/base/APIIS";

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
