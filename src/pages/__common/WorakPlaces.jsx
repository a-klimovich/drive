import {
  Input, Row, Col, Form, Select,
} from 'antd';

const { Option } = Select;

export default function WorakPlaces() {
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
        <Form.Item name="organization" label="Наименование организации или ИП ">
          <Input placeholder="Введите наименование" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Form.Item name="unp" label="УНП">
          <Input placeholder="Введите УНП" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Form.Item name="registration_region" label="Место регистрации область">
          <Select placeholder="Введите город">
            <Option value="0">Не выбрано</Option>
            <Option value="1">Брестская</Option>
            <Option value="2">Гомельская</Option>
            <Option value="3">Гродненская</Option>
            <Option value="4">Могилевская</Option>
            <Option value="5">Минская</Option>
            <Option value="6">Витебская</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Form.Item name="registration_city" label="Место регистрации, город">
          <Input placeholder="г. Название" />
        </Form.Item>
      </Col>
    </Row>
  );
}
