/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

// UTILS
import Context from 'context/Context';
import normalizeValue from 'utils/normalizeFormValue';

// API
import { BASE_URL } from 'api/url';
import request from 'api/axios';

// COMPONENTS
import Page from 'layout/Page';
import {
  DatePicker, Radio, Checkbox, InputNumber, Row, Col, Form, Button, notification, Typography,
} from 'antd';

import PersonalDate from './__common/PersonalDate';
import Membership from './__common/Membership';
import WorakPlaces from './__common/WorakPlaces';
import Contacts from './__common/Contacts';
import Insurance from './__common/Insurance';

// BASE
import initialValue from './initial';
import optionList from './optionList';

const { Text, Paragraph } = Typography;

const { RangePicker } = DatePicker;
const { Group: CheckboxGroup } = Checkbox;

const foramtDate = 'YYYY-MM-DD';

const dataFormater = (val) => (val ? dayjs(val).format(foramtDate) : '');

const dateToStringFormater = (val) => {
  if (val?.length > 1 && val[0] !== null && val[1] !== null) {
    return val?.map((d) => dayjs(d).format(foramtDate));
  }

  return null;
};

const openNotification = (status) => {
  if (status === 'OK') {
    notification.success({
      message: 'Данные успешно сохранены! Спасибо',
      duration: 3.5,
    });
  } else {
    notification.error({
      message: 'Что-то пошло не так...',
      duration: 2.5,
    });
  }
};

function Profile() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { state, setLoaded, loaded } = useContext(Context);
  const { user } = state;

  const [dataRangeInsurense, setDataRangeInsurense] = useState(null);
  const [periodInsuranceStart, setPeriodInsuranceStart] = useState(null);

  const [qualification, setQualifications] = useState('');
  const [currency, setCurrency] = useState('');
  const [education, setEducation] = useState([]);
  const [legalEntities, setLegalEntities] = useState([]);
  const [individualEntrepreneurs, setIndividualEntrepreneurs] = useState([]);
  const [individualPerson, setIndividualPerson] = useState([]);
  const [provideServicesTaxConsultant, setProvideServicesTaxConsultant] = useState(false);

  const handleChangeQualifications = (e, val) => setQualifications(e?.target?.value || val);
  const handleValueCurrancy = (e, val) => setCurrency(e?.target?.value || val);

  const handleProvideServicesTaxConsultant = (checkedValues) => {
    setProvideServicesTaxConsultant(checkedValues.target.checked);
  };
  const handleChangeIndividualEntrepreneurs = (checkedValues) => {
    setIndividualEntrepreneurs(checkedValues);
  };
  const handleChangeEducation = (checkedValues) => setEducation(checkedValues);
  const handleChangeLegalEntities = (checkedValues) => setLegalEntities(checkedValues);
  const handleChangeIndividualPerson = (checkedValues) => setIndividualPerson(checkedValues);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...normalizeValue(user),
      });

      handleChangeQualifications({}, user?.qualification);
      handleValueCurrancy({}, user?.currency);
      handleChangeLegalEntities(user?.legal_entity_services);
      handleChangeIndividualEntrepreneurs(user?.entrepreneurs_services);
      handleChangeIndividualPerson(user?.personal_services);
      handleChangeEducation(user?.high_education);
      setProvideServicesTaxConsultant(user?.is_consultant);

      // date range
      setDataRangeInsurense(user?.date_insurance_start);
      setPeriodInsuranceStart(user?.period_insurance_start);
    }
  }, [user, form]);

  useEffect(() => {
    if (!user) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, []);

  const onFinish = (values) => {
    const {
      date_insurance_from,
      date_certificate_start,
      date_certificate_stop,
      date_membership_exclusion,
      date_membership_start,
      date_membership_stop,
      date_certificate_renew,
    } = values;

    const updateValue = {
      ...values,
      currency,
      qualification,

      high_education: education,
      is_consultant: provideServicesTaxConsultant,
      legal_entity_services: legalEntities,
      entrepreneurs_services: individualEntrepreneurs,
      personal_services: individualPerson,

      date_insurance_start: dateToStringFormater(dataRangeInsurense),
      period_insurance_start: dateToStringFormater(periodInsuranceStart),

      date_insurance_from: dataFormater(date_insurance_from),
      date_certificate_stop: dataFormater(date_certificate_stop),
      date_certificate_start: dataFormater(date_certificate_start),
      date_membership_exclusion: dataFormater(date_membership_exclusion),
      date_membership_start: dataFormater(date_membership_start),
      date_membership_stop: dataFormater(date_membership_stop),
      date_certificate_renew: dataFormater(date_certificate_renew),
    };

    // REQUEST
    request
      .patch(`${BASE_URL.USER}`, updateValue)
      .then((response) => {
        if (response?.statusText === 'OK') {
          openNotification('OK');
        }
      })
      .catch(() => {
        openNotification(false);
      });
  };

  return (
    <Page loading={loaded}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValue}
        className="profile-settings-form"
        scrollToFirstError
        validateTrigger="onSubmit"
      >
        <div className="container mb-3">
          <Button type="primary" onClick={() => navigate('/')} className="profile-page-goBack">
            Вернуться
          </Button>

          <Paragraph>
            <Text type="danger">*</Text>
            {' '}
            - отмечены поля обязательные для заполнения
          </Paragraph>

          <PersonalDate />

          <p className="centered mb-3">Член ПНК</p>

          <Membership />

          <p className="required-mark">Квалификация, как в аттестате:</p>

          <Radio.Group
            options={optionList.qualification}
            onChange={handleChangeQualifications}
            value={qualification}
            name={qualification}
            className="radio-grup-column"
            direction="vertical"
          />

          <p className="required-mark">Высшее образование:</p>

          <Form.Item
            name="high_education"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, выберите Высшее образование',
              },
            ]}
          >
            <CheckboxGroup
              value={education}
              onChange={handleChangeEducation}
            >
              <Row>
                <Col>
                  <Checkbox value="checked-1">Экономическое</Checkbox>
                </Col>
                <Col>
                  <Checkbox value="checked-2">Юридическое</Checkbox>
                </Col>
              </Row>
            </CheckboxGroup>
          </Form.Item>
        </div>

        <div className="solo-checkbox bg-gray py-2 mb-2">
          <Form.Item name="is_consultant" valuePropName="checked">
            <Checkbox onChange={handleProvideServicesTaxConsultant}>
              Не оказываю услуги в качестве налогового консультанта
            </Checkbox>
          </Form.Item>
        </div>

        <div className="container">
          <p className="centered mb-3">Договор страхования ответственности</p>

          <Insurance provideServicesTaxConsultant={provideServicesTaxConsultant} />

          <Row
            gutter={[
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
            ]}
          >
            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                name="date_insurance_start"
                label="Срок действия"
                rules={[
                  {
                    required: !provideServicesTaxConsultant,
                  },
                ]}
              >
                <RangePicker
                  onChange={(val) => setDataRangeInsurense(val)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Form.Item
                name="period_insurance_start"
                label="Срок страхования"
                rules={[
                  {
                    required: !provideServicesTaxConsultant,
                  },
                ]}
              >
                <RangePicker
                  onChange={(val) => setPeriodInsuranceStart(val)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Row
                gutter={[
                  {
                    xs: 5,
                    sm: 5,
                    md: 10,
                    lg: 15,
                  },
                  0,
                ]}
              >
                <Col span={12}>
                  <Form.Item name="liability_limit" label="Лимит ответственности">
                    <InputNumber placeholder="Введите сумму" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Валюта">
                    <Radio.Group
                      options={optionList.currency}
                      onChange={handleValueCurrancy}
                      value={currency}
                      name={currency}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <p className="centered mb-3">Место работы в качестве налогового консультанта </p>

          <WorakPlaces />
        </div>

        <div className="container">
          <p className="centered mb-3">Контактная информация</p>

          <Contacts />

          <p className="centered mb-3">Оказываемые услуги</p>

          <p className="subtitle">ЮРИДИЧЕСКИМ ЛИЦАМ</p>

          <CheckboxGroup value={legalEntities} onChange={handleChangeLegalEntities}>
            <Row>
              <Col span={24}>
                <Checkbox value="checked-1">
                  Консультирование по вопросам налогообложения, в том числе в части применения налогового
                  законодательства в конкретных ситуациях с учетом обстоятельств, имеющихся у консультируемого лица
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-2">
                  Подготовка рекомендаций (заключений) по вопросам налогообложения, включая определение оптимальных
                  решений
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-3">
                  Оказание услуг по ведению бухгалтерского и (или) налогового учета, составлению отчетности, налоговых
                  деклараций (расчетов) и иных документов, в том числе жалоб
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-4">
                  Представительство интересов в налоговых правоотношениях в налоговых и иных государственных органах,
                  организациях на основании договора возмездного оказания услуг по налоговому консультированию
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-5">
                  Проведение независимой оценки соблюдения налогового законодательства консультируемыми лицами
                </Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>

          <p className="subtitle">ИНДИВИДУАЛЬНЫМ ПРЕДПРИНИМАТЕЛЯМ</p>

          <CheckboxGroup value={individualEntrepreneurs} onChange={handleChangeIndividualEntrepreneurs}>
            <Row>
              <Col span={24}>
                <Checkbox value="checked-1">
                  Консультирование по вопросам налогообложения, в том числе в части применения налогового
                  законодательства в конкретных ситуациях с учетом обстоятельств, имеющихся у консультируемого лица
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-2">
                  Подготовка рекомендаций (заключений) по вопросам налогообложения, включая определение оптимальных
                  решений
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-3">
                  Оказание услуг по ведению учета доходов и расходов и (или) налогового учета, составлению налоговых
                  деклараций (расчетов) и иных документов, в том числе жалоб
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-4">
                  Представительство интересов в налоговых правоотношениях в налоговых и иных государственных органах,
                  организациях на основании договора возмездного оказания услуг по налоговому консультированию
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-5">
                  Проведение независимой оценки соблюдения налогового законодательства консультируемыми лицами
                </Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>

          <p className="subtitle">ФИЗИЧЕСКИМ ЛИЦАМ</p>

          <CheckboxGroup value={individualPerson} onChange={handleChangeIndividualPerson}>
            <Row>
              <Col span={24}>
                <Checkbox checked value="checked-1">
                  Консультирование по вопросам налогообложения, в том числе в части применения налогового
                  законодательства в конкретных ситуациях с учетом обстоятельств, имеющихся у консультируемого лица
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-2">
                  Подготовка рекомендаций (заключений) по вопросам налогообложения, включая определение оптимальных
                  решений
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-3">
                  Оказание услуг по составлению налоговых деклараций (расчетов) и иных документов, в том числе жалоб
                </Checkbox>
              </Col>
              <Col span={24}>
                <Checkbox value="checked-4">
                  Представительство интересов в налоговых правоотношениях в налоговых и иных государственных органах,
                  организациях на основании договора возмездного оказания услуг по налоговому консультированию
                </Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>

          <Form.Item className="form-profile-btn">
            <Button htmlType="primary">Сохранить</Button>
          </Form.Item>
        </div>
      </Form>
    </Page>
  );
}

export default Profile;
