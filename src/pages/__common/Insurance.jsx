import {
  DatePicker, Input, Row, Col, Form,
} from 'antd';

const Insurance = (props) => {
  const { provideServicesTaxConsultant } = props;
  return (
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
        <Form.Item
          name="insurance"
          label="Страховой полис №"
          rules={[
            {
              required: !provideServicesTaxConsultant,
            },
          ]}
        >
          <Input placeholder="Введите номер" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Form.Item
          name="insurance_serial_num"
          label="Серия"
          rules={[
            {
              required: !provideServicesTaxConsultant,
            },
          ]}
        >
          <Input placeholder="Введите серию" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Form.Item
          name="date_insurance_from"
          label="От"
          rules={[
            {
              required: !provideServicesTaxConsultant,
            },
          ]}
        >
          <DatePicker placeholder="Выберите дату" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Insurance;
