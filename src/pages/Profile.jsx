import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
    companyName: '',
    unp: '',
    city: '',
    region: '',
  }
}

const { Item } = Form;
const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [dataRangeFormatting, setDataRangeFormatting] = useState([])
  const [qualifications, setQualifications] = useState([])
  const [education, setEducation] = useState([])
  const [legalEntities, setLegalEntities] = useState([])
  const [individualEntrepreneurs, setIndividualEntrepreneurs] = useState([])
  const [individualPerson, setIndividualPerson] = useState([])
  const [provideServicesTaxConsultant, setProvideServicesTaxConsultant] = useState(false)
  // req to GET defaultValue = value

  const onFinish = (values) => {
    console.log(dataRangeFormatting);
    console.log("form values", {
      ...values,
      qualifications: qualifications,
      education: education,
      provideServicesTaxConsultant: provideServicesTaxConsultant,
      legalEntities: legalEntities,
      individualEntrepreneurs: individualEntrepreneurs,
      individualPerson: individualPerson,
    });
  };

  const handlerDataRange = (_, info, val) => {
    setDataRangeFormatting(info)
  };

  const handleChangeQualifications = (checkedValues) => {
    setQualifications(checkedValues)
  };

  const handleChangeEducation = (checkedValues) => {
    setEducation(checkedValues)
  };

  const handleChangeLegalEntities = (checkedValues) => {
    setLegalEntities(checkedValues)
  };

  const handleChangeIndividualEntrepreneurs = (checkedValues) => {
    setIndividualEntrepreneurs(checkedValues)
  };

  const handleChangeIndividualPerson = (checkedValues) => {
    setIndividualPerson(checkedValues)
  };

  const handleProvideServicesTaxConsultant = (checkedValues) => {
    setProvideServicesTaxConsultant(checkedValues.target.checked)
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValue}
      defaultValue
      className={'profile-settings-form'}
    >
      <div className="container">
        <Button onClick={() => navigate(-1)} className="profile-page-goBack">
          Вернуться
        </Button>

        <Row
          gutter={[
            { xs: 5, sm: 5, md: 10, lg: 15 },
            { xs: 4, sm: 6, md: 15, lg: 10 }
          ]}
        >
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item label="Фамилия" name='lastname'>
              <Input placeholder="Введите фамилию" />
            </Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item label="Имя" name='firstName'>
              <Input placeholder="Введите имя" />
            </Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item label="Отчество" name='shureName'>
              <Input placeholder="Введите отчество" />
            </Item>
          </Col>
        </Row>

        <Row
          gutter={[
            { xs: 5, sm: 5, md: 10, lg: 15 },
            { xs: 4, sm: 6, md: 15, lg: 10 }
          ]}
        >
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='certificate' label="Аттестат №">
              <InputNumber
                controls={false}
                placeholder="Введите 7 цифр номера"
              />
            </Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='dateIssue' label="Дата выдачи">
              <DatePicker placeholder="Выберите дату" />
            </Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='dateCancellation' label="Дата аннулирования">
              <DatePicker placeholder="Выберите дату" />
            </Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='dateRenewal' label="Дата возобновления действия">
              <DatePicker placeholder="Выберите дату" />
            </Item>
          </Col>
        </Row>

        <p>Член ПНК</p>

        <Row
          gutter={[
            { xs: 5, sm: 5, md: 10, lg: 15 },
            { xs: 4, sm: 6, md: 15, lg: 10 }
          ]}
        >
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='dateEntry' label="Дата вступления ">
              <DatePicker placeholder="Выберите дату" />
            </Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='dateMembership' label="Дата приостановления членства">
              <DatePicker placeholder="Выберите дату" />
            </Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='dateException' label="Дата исключения ">
              <DatePicker placeholder="Выберите дату" />
            </Item>
          </Col>
        </Row>

        <p>Квалификация, как в аттестате:</p>

        <Item>
          <CheckboxGroup onChange={handleChangeQualifications}>
            <Row>
              <Col
                span={24}
              >
                <Checkbox value={'checked-1'}>налоговое консультирование организаций, индивидуальных предпринимателей и физических лиц</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-2'}>налоговое консультирование организаций</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-3'}>налоговое консультирование индивидуальных предпринимателей и физических лиц</Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </Item>

        <p>Высшее образование:</p>

        <Item>
          <CheckboxGroup onChange={handleChangeEducation}>
            <Row>
              <Col>
                <Checkbox value='checked-1'>экономическое</Checkbox>
              </Col>
              <Col>
                <Checkbox value='checked-2'>юридическое</Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </Item>

        <p>Договор страхования ответственности</p>

        <Row
          gutter={[
            { xs: 5, sm: 5, md: 10, lg: 15 },
            { xs: 4, sm: 6, md: 15, lg: 10 }
          ]}
        >
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name={['insuranceContract', 'number']} label="Страховой полис №">
              <InputNumber controls={false} placeholder="Введите номер" />
            </Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name={['insuranceContract', 'series']} label="серия">
              <Input placeholder="Введите серию" />
            </Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name={['insuranceContract', 'date']} label="от">
              <DatePicker placeholder="Выберите дату" />
            </Item>
          </Col>
        </Row>

        <Row
          gutter={[
            { xs: 5, sm: 5, md: 10, lg: 15 },
            { xs: 4, sm: 6, md: 15, lg: 10 }
          ]}
        >
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <Item name={['insuranceContract', 'validity']} label="Срок действия">
              <RangePicker onChange={(val) => handlerDataRange(val)} />
            </Item>
          </Col>
          <Col
            xs={24}
            sm={12}
            md={8}
            lg={6}
          >
            <Item name={['insuranceContract', 'term']} label="Срок страхования">
              <RangePicker onChange={(val) => handlerDataRange(val)} />
            </Item>
          </Col>

          <Col
            xs={24}
            sm={12}
            md={12}
            lg={12}
          >
            <Row
              gutter={[{ xs: 5, sm: 5, md: 10, lg: 15 }, 0]}
            >
              <Col
                span={12}
              >
                <Item label="Лимит ответственности">
                  <InputNumber name={['insuranceContract', 'liabilityLimit']} placeholder="Введите сумму" />
                </Item>
              </Col>

              <Col
                span={12}
              >
                <Item label="Валюта">

                  <RadioGroup name={['insuranceContract', 'currency']} defaultValue="rub">
                    <Radio value="rub" defaultChecked>RUB</Radio>
                    <Radio value="usd" defaultChecked={false}>USD</Radio>
                  </RadioGroup>
                </Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <p>Место работы в качестве налогового консультанта </p>

        <Row
          gutter={[
            { xs: 5, sm: 5, md: 10, lg: 15 },
            { xs: 4, sm: 6, md: 15, lg: 10 }
          ]}
        >
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name={['placeOfWork', 'companyName']} label="Наименование организации или ИП ">
              <Input placeholder="Введите наименование" />
            </Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name={['placeOfWork', 'unp']} label="УНП">
              <Input placeholder="Введите УНП" />
            </Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name={['placeOfWork', 'region']} label="Место регистрации область">
              <Select placeholder="Введите город">
                <Option value='Minsk'>Minsk</Option>
              </Select>
            </Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name={['placeOfWork', 'city']} label='Место регистрации город'>
              <Select placeholder="Выберите область">
                <Option value='Lida'>Lida</Option>
              </Select>
            </Item>
          </Col>
        </Row>
      </div>

      <div className="solo-checkbox">
        <Checkbox onChange={handleProvideServicesTaxConsultant}>
          Не оказываю услуги в качестве налогового консультанта
        </Checkbox>
      </div>

      <div className="container">
        <p>Контактная информация</p>

        <Row
          gutter={[
            { xs: 5, sm: 5, md: 10, lg: 15 },
            { xs: 4, sm: 6, md: 15, lg: 10 }
          ]}
        >
          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='phoneNumber' label="Номер телефона">
              <Input placeholder="801642345678" />
            </Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item
              name="email"
              label="e-mail"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Введите e-mail" />
            </Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}
          >
            <Item name='siteUrl' label="Адрес официального сайта">
              <Input placeholder="Введите адрес" />
            </Item>
          </Col>
        </Row>

        <p>Оказываемые услуги</p>
        <p className="subtitle">ЮРИДИЧЕСКИМ ЛИЦАМ</p>

        <Item>
          <CheckboxGroup onChange={handleChangeLegalEntities}>
          <Row>
              <Col
                span={24}
              >
                <Checkbox value={'checked-1'}>консультирование по вопросам налогообложения, в том числе в части применения налогового законодательства в конкретных ситуациях с учетом обстоятельств, имеющихся у консультируемого лица</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-2'}>подготовка рекомендаций (заключений) по вопросам налогообложения, включая определение оптимальных решений</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-3'}>оказание услуг по ведению бухгалтерского и (или) налогового учета, составлению отчетности, налоговых деклараций (расчетов) и иных документов, в том числе жалоб</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-4'}>представительство интересов в налоговых правоотношениях в налоговых и иных государственных органах, организациях на основании договора возмездного оказания услуг по налоговому консультированию</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-5'}>проведение независимой оценки соблюдения налогового законодательства консультируемыми лицами</Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </Item>

        <p className="subtitle">ИНДИВИДУАЛЬНЫМ ПРЕДПРИНИМАТЕЛЯМ</p>

        <Item>
          <CheckboxGroup onChange={handleChangeIndividualEntrepreneurs}>
            <Row>
              <Col
                span={24}
              >
                <Checkbox value={'checked-1'}>консультирование по вопросам налогообложения, в том числе в части применения налогового законодательства в конкретных ситуациях с учетом обстоятельств, имеющихся у консультируемого лица</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-2'}>подготовка рекомендаций (заключений) по вопросам налогообложения, включая определение оптимальных решений</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-3'}>оказание услуг по ведению учета доходов и расходов и (или) налогового учета, составлению налоговых деклараций (расчетов) и иных документов, в том числе жалоб</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-4'}>представительство интересов в налоговых правоотношениях в налоговых и иных государственных органах, организациях на основании договора возмездного оказания услуг по налоговому консультированию</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-5'}>проведение независимой оценки соблюдения налогового законодательства консультируемыми лицами</Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </Item>

        <p className="subtitle">ФИЗИЧЕСКИМ ЛИЦАМ</p>

        <Item>
          <CheckboxGroup onChange={handleChangeIndividualPerson}>
            <Row>
              <Col
                span={24}
              >
                <Checkbox value={'checked-1'}>консультирование по вопросам налогообложения, в том числе в части применения налогового законодательства в конкретных ситуациях с учетом обстоятельств, имеющихся у консультируемого лица</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-2'}>подготовка рекомендаций (заключений) по вопросам налогообложения, включая определение оптимальных решений</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-3'}>оказание услуг по составлению налоговых деклараций (расчетов) и иных документов, в том числе жалоб</Checkbox>
              </Col>
              <Col
                span={24}
              >
                <Checkbox value={'checked-4'}>представительство интересов в налоговых правоотношениях в налоговых и иных государственных органах, организациях на основании договора возмездного оказания услуг по налоговому консультированию</Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </Item>

        <Item
          className="form-profile-btn"
        >
          <Button htmlType="primary">Сохранить</Button>
        </Item>
      </div>
    </Form>
  );
};

export default Profile;
