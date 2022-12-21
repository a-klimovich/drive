import {
  Input, Row, Col, Form,
} from 'antd';

export default function Contacts() {
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
          name="phone"
          label="Номер телефона"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="801642345678" />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={12} lg={8}>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              required: true,
              type: 'email',
            },
          ]}
        >
          <Input placeholder="Введите e-mail" />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} md={12} lg={8}>
        <Form.Item
          name="url"
          label="Адрес официального сайта"
        >
          <Input placeholder="Введите адрес" />
        </Form.Item>
      </Col>
    </Row>
  );
}
