import { useCallback } from 'react';
import {
  Table, Typography, Row, Col,
} from 'antd';
import { columns } from './config';

const { Paragraph, Link } = Typography;

const TableAppeals = ({ data }) => {
  const ExtendContent = useCallback((record) => {
    const fileList = record?.docs?.map(({ file, id }) => (
      <Link key={`link_${id}`} href={file}>{`file: ${id}`}</Link>
    ));

    return (
      <>
        <Paragraph strong>Ситуация распространенная или единичный случай</Paragraph>
        <Paragraph>{record.appeal}</Paragraph>
        <Paragraph strong>
          Ваши предложения о возможном порядке применения указанной нормы
          законодательства или ее корректировки для урегулирования вопроса, ситуации
        </Paragraph>
        <Paragraph>{record.common_or_not}</Paragraph>
        <Paragraph strong>
          Ваш вариант текста обращения от ПНК в государственные органы за
          разъяснением и урегулированием сложившейся ситуации
        </Paragraph>
        <Paragraph>{record.suggestions}</Paragraph>

        <Row
          justify="space-between"
        >
          <Col>
            <Paragraph strong>Дата отправки:</Paragraph>
            <Paragraph>{record.created_at}</Paragraph>
          </Col>
          <Col>
            <Paragraph strong>Файлы:</Paragraph>
            <Paragraph>{fileList}</Paragraph>
          </Col>
        </Row>
      </>
    );
  });

  return (
    <Table
      dataSource={data}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => ExtendContent(record),
      }}
    />
  );
};

export default TableAppeals;
