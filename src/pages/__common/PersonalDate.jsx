import {
  DatePicker,
  Input,
  InputNumber,
  Row,
  Col,
  Form,
} from 'antd';

export default function PersonalDate() {
  return (
    <>
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
            label="Фамилия"
            name="last_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Введите фамилию" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Имя"
            name="first_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            label="Отчество"
            name="middle_name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Введите отчество" />
          </Form.Item>
        </Col>
      </Row>

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
            name="certificate"
            label="Аттестат №"
            rules={[
              {
                required: true,
              },
              {
                pattern: /^[\d]{0,7}$/,
                message: 'Максимальное кол-во символов 7',
              },
            ]}
          >
            <InputNumber controls={false} placeholder="Введите 7 цифр номера" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            name="date_certificate_start"
            label="Дата выдачи"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item name="date_certificate_stop" label="Дата приостановления действий">
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={12} lg={8}>
          <Form.Item
            name="date_certificate_renew"
            label="Дата возобновления действия"
          >
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
