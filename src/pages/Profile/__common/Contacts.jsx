import {
  Input, Row, Col, Form,
} from 'antd';
import { useState } from 'react';

const gutter = [
  {
    xs: 5,
    sm: 5,
    md: 10,
    lg: 15,
  },
  {
    xs: 4,
    sm: 6,
    md: 15,
    lg: 10,
  },
];

const Contacts = () => {
  const [isWarning, setIsWarning] = useState(null);
  const [helpMessage, setHelpMessage] = useState(null);

  const validateUrl = (_, value, callback) => {
    if (
      value
      && !/^(http|https):\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(value)
    ) {
      callback('Ожидаемый формат https://сайт.доменная_зона или http://сайт.доменная_зона');
    } else {
      callback();
    }
  };

  return (
    <Row gutter={gutter}>
      <Col xs={24} sm={12} md={12} lg={8}>
        <Form.Item
          name="phone"
          label="Номер телефона"
          rules={[{ required: true }]}
          validateStatus={isWarning}
          help={helpMessage}
          normalize={(value) => {
            const cleanNumber = value.replace(/\D/g, '');
            const pattern = /^(\+375\s\d{2}\s\d{3}\s\d{2}\s\d{2})$/;

            const prefix = cleanNumber.slice(0, 3);
            const code = cleanNumber.slice(3, 5);
            const firstPartNumber = cleanNumber.slice(5, 8);
            const secondPartNumber = `${cleanNumber.slice(8, 10)}`;
            const lastPartNumber = `${cleanNumber.slice(10, 12)}`;

            const formattedNumber = `+${prefix} ${code} ${firstPartNumber} ${secondPartNumber} ${lastPartNumber}`;

            const isCodeValid = code !== '29' && code !== '33' && code !== '44';
            const isPrefixValid = prefix === '375';

            if (cleanNumber.length > 5 && isCodeValid) {
              setIsWarning('warning');
              setHelpMessage('Верно ли введен код 29, 33 или 44?');
            } else if (prefix.length === 3 && !isPrefixValid) {
              setIsWarning('warning');
              setHelpMessage('Верно ли введен префикс "375"?');
            } else {
              setIsWarning(null);
              setHelpMessage(null);
            }

            if (pattern.test(formattedNumber)) {
              return formattedNumber;
            }

            return value;
          }}
        >
          <Input placeholder="+375 29 123 45 67" />
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
          label="Сайт (блог)"
          rules={[
            {
              required: false,
              message: 'Пожалуйста, введите Сайт (блог)',
              validateStatus: 'error',
            },
            { validator: validateUrl },
          ]}
        >
          <Input placeholder="Введите адрес" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default Contacts;
