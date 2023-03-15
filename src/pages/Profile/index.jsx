import {
  useState, useEffect, useContext, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DatePicker, Radio, Checkbox, InputNumber, Row, Col, Form, Button, Typography,
} from 'antd';
import Context from 'context/Context';
import { dataFormater, dateToStringFormater, normalizeValue } from 'utils/normalizeFormValue';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import Page from 'layout/Page';
import openNotification from 'components/Toasts';
import PersonalDate from './__common/PersonalDate';
import Membership from './__common/Membership';
import WorakPlaces from './__common/WorakPlaces';
import Contacts from './__common/Contacts';
import Insurance from './__common/Insurance';
import initialValue from './initial';
import config from './config';

const { Text, Paragraph } = Typography;
const { Group: CheckboxGroup } = Checkbox;

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { state, setLoaded, loaded } = useContext(Context);
  const { user } = state;

  const [dataRangeInsurance, setDataRangeInsurance] = useState(null);
  const [periodInsuranceStart, setPeriodInsuranceStart] = useState(null);

  const [qualification, setQualification] = useState('');
  const [currency, setCurrency] = useState('');
  const [education, setEducation] = useState([]);
  const [legalEntities, setLegalEntities] = useState([]);
  const [individualEntrepreneurs, setIndividualEntrepreneurs] = useState([]);
  const [individualPerson, setIndividualPerson] = useState([]);
  const [provideServicesTaxConsultant, setProvideServicesTaxConsultant] = useState(false);

  const handleChangeQualification = (e, val) => setQualification(e?.target?.value || val);
  const handleCurrencyValue = (e, val) => setCurrency(e?.target?.value || val);

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
      form.setFieldsValue(normalizeValue(user));

      handleChangeQualification({}, user?.qualification);
      handleCurrencyValue({}, user?.currency);
      handleChangeLegalEntities(user?.legal_entity_services);
      handleChangeIndividualEntrepreneurs(user?.entrepreneurs_services);
      handleChangeIndividualPerson(user?.personal_services);
      handleChangeEducation(user?.high_education);
      setProvideServicesTaxConsultant(user?.is_consultant);

      setDataRangeInsurance(user?.date_insurance_start);
      setPeriodInsuranceStart(user?.period_insurance_start);
    }
  }, [user, form]);

  useEffect(() => {
    if (!user) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [user]);

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

      date_insurance_start: dateToStringFormater(dataRangeInsurance),
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

          <Form.Item
            name="qualification"
          >
            <Radio.Group
              options={config.qualification}
              onChange={handleChangeQualification}
              // value={qualification}
              className="radio-grup-column"
              direction="vertical"
            />
          </Form.Item>

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
              // value={education}
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
                <DatePicker.RangePicker
                  onChange={(val) => setDataRangeInsurance(val)}
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
                <DatePicker.RangePicker
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
                      options={config.currency}
                      onChange={handleCurrencyValue}
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
              {
                config.legalEntities.map((item, index) => (
                  <Col span={24} key={item.id}>
                    <Checkbox value={`checked-${index + 1}`}>{item.text}</Checkbox>
                  </Col>
                ))
              }
            </Row>
          </CheckboxGroup>

          <p className="subtitle">ИНДИВИДУАЛЬНЫМ ПРЕДПРИНИМАТЕЛЯМ</p>

          <CheckboxGroup
            value={individualEntrepreneurs}
            onChange={handleChangeIndividualEntrepreneurs}
          >
            <Row>
              {
                config.individualEntrepreneurs.map((item, index) => (
                  <Col span={24} key={item.id}>
                    <Checkbox value={`checked-${index + 1}`}>{item.text}</Checkbox>
                  </Col>
                ))
              }
            </Row>
          </CheckboxGroup>

          <p className="subtitle">ФИЗИЧЕСКИМ ЛИЦАМ</p>

          <CheckboxGroup value={individualPerson} onChange={handleChangeIndividualPerson}>
            <Row>
              {
                config.individualPerson.map((item, index) => (
                  <Col span={24} key={item.id}>
                    <Checkbox value={`checked-${index + 1}`}>{item.text}</Checkbox>
                  </Col>
                ))
              }
            </Row>
          </CheckboxGroup>

          <Form.Item className="form-profile-btn">
            <Button htmlType="primary">Сохранить</Button>
          </Form.Item>
        </div>
      </Form>
    </Page>
  );
};

export default Profile;
