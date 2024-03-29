import { useCallback, useContext } from 'react';
import {
  Table, Typography, Row, Col,
} from 'antd';
import dayjs from 'dayjs';
import config from 'config';
import Context from 'context/Context';
import { columns } from './config';

const { Paragraph, Link } = Typography;

const TableAppeals = ({ data, loading }) => {
  const { state } = useContext(Context);
  const isUserCanChangeStatus = state?.user?.appeal_status;

  const ExtendContent = useCallback((record) => {
    const fileList = record?.docs?.map(({ file, id, name }) => (
      <Link key={`link_${id}`} href={file}>{name}</Link>
    ));

    return (
      <>
        <Paragraph strong>Ситуация распространенная или единичный случай</Paragraph>
        <Paragraph>{record.common_or_not}</Paragraph>
        <Paragraph strong>
          Ваши предложения о возможном порядке применения указанной нормы
          законодательства или ее корректировки для урегулирования вопроса, ситуации
        </Paragraph>
        <Paragraph>{record.suggestions}</Paragraph>
        <Paragraph strong>
          Ваш вариант текста обращения от ПНК в государственные органы за
          разъяснением и урегулированием сложившейся ситуации
        </Paragraph>
        <Paragraph>{record.appeal}</Paragraph>

        <Row
          justify="space-between"
        >
          <Col>
            <Paragraph strong>Файлы:</Paragraph>
            <Paragraph>{fileList}</Paragraph>
          </Col>
          <Row gutter={20}>
            <Col>
              <Paragraph strong>Дата отправки:</Paragraph>
              <Paragraph>{dayjs(record.created_at).format(config.dateFormat)}</Paragraph>
            </Col>
            <Col>
              <Paragraph strong>Автор:</Paragraph>
              <Paragraph>{record.author}</Paragraph>
            </Col>
          </Row>
        </Row>
      </>
    );
  });

  return (
    <Table
      dataSource={data}
      columns={columns(isUserCanChangeStatus)}
      loading={loading}
      expandable={{
        expandedRowRender: (record) => ExtendContent(record),
      }}
    />
  );
};

export default TableAppeals;
