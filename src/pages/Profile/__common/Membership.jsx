import {
  DatePicker, Row, Col, Form,
} from 'antd';
import config from 'config';

const Membership = () => (
  <Row
    gutter={[
      {
        xs: 5, sm: 5, md: 10, lg: 15,
      },
      {
        xs: 4, sm: 6, md: 15, lg: 10,
      },
    ]}
  >
    <Col xs={24} sm={12} md={12} lg={8}>
      <Form.Item name="date_membership_start" label="Дата вступления">
        <DatePicker placeholder="Выберите дату" format={config.dateFormat} />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={12} lg={8}>
      <Form.Item name="date_membership_stop" label="Дата приостановления членства">
        <DatePicker placeholder="Выберите дату" format={config.dateFormat} />
      </Form.Item>
    </Col>
    <Col xs={24} sm={12} md={12} lg={8}>
      <Form.Item name="date_membership_exclusion" label="Дата возобновления членства">
        <DatePicker placeholder="Выберите дату" format={config.dateFormat} />
      </Form.Item>
    </Col>
  </Row>
);

export default Membership;
