import React, { useState } from "react";
import {
  DatePicker,
  Input,
  Radio,
  Checkbox,
  InputNumber,
  Select,
  Row,
  Col,
  Form,
  Button,
} from "antd";

const { RangePicker } = DatePicker;
const { Option } = Select;

const initialValue = {
  siteUrl: '',
  certificate: '',
  dateCancellation: '',
  dateEntry: '',
  dateException: '',
  dateIssue: '',
  dateMembership: '',
  dateRenewal: '',
  email: '',
  firstName: '',
  lastname: '',
  phoneNumber: '',
  shureName: '',
  insuranceContract: {
    number: '',
    series: '',
    date: '',
    validity: [],
    term: [],
    liabilityLimit: '',
    currency: '',
  },
  placeOfWork: {
    сompanyName: '',
    unp: '',
    city: '',
    region: '',
  }
}

const Profile = () => {
  const [form] = Form.useForm();
  const [dataRangeFormatting, setDataRangeFormatting] = useState([])
  // req to GET defaultValue = value

  const onFinish = (values) => {
    console.log(dataRangeFormatting);
    console.log("form values", {
      ...values,

    });
  };

  const handlerDataRange = (_, info, val) => {
    console.log('val', val);
    console.log('dateString', info);
    setDataRangeFormatting(info)
  };

  return (
    <Form 
    form={form} 
    layout="vertical" 
    onFinish={onFinish}
    initialValues={initialValue}
    defaultValue
    >
      <Row>
        <Col>
          <Form.Item label="Фамилия" name='lastname'>
            <Input placeholder="Введите фамилию" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item label="Имя" name='firstName'>
            <Input placeholder="Введите имя" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item label="Отчество" name='shureName'>
            <Input placeholder="Введите отчество" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Item name='certificate' label="Аттестат №">
            <InputNumber placeholder="Введите 7 цифр номера" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item name='dateIssue' label="Дата выдачи">
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item name='dateCancellation' label="Дата аннулирования">
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='dateRenewal' label="Дата возобновления действия">
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>
      </Row>

      <p>Член ПНК</p>

      <Row>
        <Col>
          <Form.Item name='dateEntry' label="Дата вступления ">
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='dateMembership' label="Дата приостановления членства">
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='dateException' label="Дата исключения ">
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>
      </Row>

      <p>Квалификация, как в аттестате:</p>

      <Checkbox name="a1">
        налоговое консультирование организаций, индивидуальных предпринимателей
        и физических лиц
      </Checkbox>
      <Checkbox>налоговое консультирование организаций</Checkbox>
      <Checkbox>
        налоговое консультирование индивидуальных предпринимателей и физических
        лиц
      </Checkbox>

      <p>Высшее образование:</p>

      <Checkbox>экономическое</Checkbox>
      <Checkbox>юридическое</Checkbox>

      <p>Договор страхования ответственности</p>

      <Row>
        <Col>
          <Form.Item name='number' label="Страховой полис №">
            <InputNumber placeholder="Введите номер" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='series' label="серия">
            <Input placeholder="Введите серию" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='date' label="от">
            <DatePicker placeholder="Выберите дату" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Item name='validity' label="Срок действия">
            <RangePicker onChange={(val) => handlerDataRange(val)} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='term' label="Срок страхования">
            <RangePicker onChange={(val) => handlerDataRange(val)} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="Лимит ответственности">
            <InputNumber name='liabilityLimit' placeholder="Введите сумму" />
          </Form.Item>

          <Form.Item name='currency' label="Лимит ответственности">
            <Radio.Group>
              <Radio value="rub">item 1</Radio>
              <Radio value="usd">item 2</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <p>9. Место работы в качестве налогового консультанта </p>

      <Row>
        <Col>
          <Form.Item name='placeOfWork.сompanyName' label="Наименование организации или ИП ">
            <Input placeholder="Введите наименование" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='placeOfWork.unp' label="УНП">
            <Input placeholder="Введите УНП" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='placeOfWork.region' label="Место регистрации область">
            <Select placeholder="Введите город">
              <Option value='abc'>a</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name='placeOfWork.city' label='Место регистрации город'>
          <Select placeholder="Выберите область">
              <Option value='abc2'>b</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col>
          <Checkbox name="checkBox10">
            10. Не оказываю услуги в качестве налогового консультанта
          </Checkbox>
        </Col>
      </Row>

      <p>11. Контактная информация</p>

      <Row>
        <Col>
          <Form.Item name='phoneNumber' label="Номер телефона">
            <Input placeholder="801642345678" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="email"
            label="e-mail"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input placeholder="Введите e-mail" />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item name='siteUrl' label="Адрес официального сайта">
            <Input placeholder="Введите адрес" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button htmlType="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default Profile;
