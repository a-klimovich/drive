import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// UTILS
import Context from "../utils/context/Context";
import { BASE_URL } from "../utils/api/url";
import normalizeValue from "../utils/normalizeFormValue";

// COMMON COMPONENTS
import PersonalDate from './__common/PersonalDate';
import Membership from './__common/Membership';
import WorakPlaces from './__common/WorakPlaces';
import Contacts from './__common/Contacts';
import Insurance from './__common/Insurance';

// BASE
import initialValue from "./initial";
import optionList from "./optionList";

// AXIOS
import request from "../utils/api/axios";

import {
  DatePicker,
  Radio,
  Checkbox,
  InputNumber,
  Row,
  Col,
  Form,
  Button,
} from "antd";

const { RangePicker } = DatePicker;
const { Group: CheckboxGroup } = Checkbox;

const foramtDate = "YYYY-MM-DD";

const dataFormater = (val) => (val ? moment(val).format(foramtDate) : "");
const formatedDateRange = (val) => val?.map((item) => item ? moment(item).format(foramtDate) : "");

const Profile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { state } = useContext(Context);
  const { user } = state;

  const [periodInsuranceStart, setPeriodInsuranceStart] = useState([]);
  const [dataRangeInsurense, setDataRangeInsurense] = useState([]);
  const [qualification, setQualifications] = useState('');
  const [currency, setCurrency] = useState('');
  const [education, setEducation] = useState([]);
  const [legalEntities, setLegalEntities] = useState([]);
  const [individualEntrepreneurs, setIndividualEntrepreneurs] = useState([]);
  const [individualPerson, setIndividualPerson] = useState([]);
  const [provideServicesTaxConsultant, setProvideServicesTaxConsultant] = useState(false);
  
  const handleChangeQualifications = (e, val) => setQualifications(e?.target?.value || val);
  const handleValueCurrancy = (e, val) => setCurrency(e?.target?.value || val);
  const handlerDataRangeTerm = (arrDate) => setDataRangeInsurense(formatedDateRange(arrDate));
  const handlerDataRangeValidity = (arrDate) => setPeriodInsuranceStart(formatedDateRange(arrDate));
  const handleProvideServicesTaxConsultant = (checkedValues) => setProvideServicesTaxConsultant(checkedValues.target.checked);
  const handleChangeEducation = (checkedValues) => setEducation(checkedValues)
  // TODO: 
  const handleChangeLegalEntities = (checkedValues) => setLegalEntities(checkedValues);
  const handleChangeIndividualEntrepreneurs = (checkedValues) => setIndividualEntrepreneurs(checkedValues);
  const handleChangeIndividualPerson = (checkedValues) => setIndividualPerson(checkedValues);
  

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...normalizeValue(user),
        // ...normalizeValue(user),
      });

      handleChangeQualifications({}, user?.qualification);
      handleValueCurrancy({}, user?.currency);
      handleChangeLegalEntities(user?.legal_entity_services);
      handleChangeIndividualEntrepreneurs(user?.entrepreneurs_services);
      handleChangeIndividualPerson(user?.personal_services);
      handleChangeEducation(user?.high_education);
    }
  }, [user, form]);

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
      date_insurance_start: dataRangeInsurense,
      period_insurance_start: periodInsuranceStart,

      date_insurance_from: dataFormater(date_insurance_from),
      date_certificate_stop: dataFormater(date_certificate_stop),
      date_certificate_start: dataFormater(date_certificate_start),
      date_membership_exclusion: dataFormater(date_membership_exclusion),
      date_membership_start: dataFormater(date_membership_start),
      date_membership_stop: dataFormater(date_membership_stop),
      date_certificate_renew: dataFormater(date_certificate_renew),
    };

    // REQUEST
    request.patch(`${BASE_URL.USER}`, updateValue).catch(function (error) {
      console.log(error);
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValue}
      className={"profile-settings-form"}
      scrollToFirstError
      validateTrigger="onBlur"
    >
      <div className="container">
        <Button onClick={() => navigate("/")} className="profile-page-goBack">
          Вернуться
        </Button>

        <PersonalDate />

        <p>Член ПНК</p>

        <Membership />

        <p className="required-mark">Квалификация, как в аттестате:</p>

        <Radio.Group
          options={optionList.qualification}
          onChange={handleChangeQualifications}
          value={qualification}
          name={qualification}
          layout="vertical"
          className='radio-grup-column'
        />

        <p className="required-mark">Высшее образование:</p>

        <CheckboxGroup value={education} onChange={handleChangeEducation}>
          <Row>
            <Col>
              <Checkbox value="checked-1">Экономическое</Checkbox>
            </Col>
            <Col>
              <Checkbox value="checked-2">Юридическое</Checkbox>
            </Col>
          </Row>
        </CheckboxGroup>

        <p>Договор страхования ответственности</p>

        <Insurance />

        <Row
          gutter={[
            { xs: 5, sm: 5, md: 10, lg: 15 },
            { xs: 4, sm: 6, md: 15, lg: 10 },
          ]}
        >
          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              name="period_insurance_start"
              label="Срок действия"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <RangePicker onChange={(val) => handlerDataRangeValidity(val)} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8} lg={6}>
            <Form.Item
              name="date_insurance_start"
              label="Срок страхования"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <RangePicker onChange={(val) => handlerDataRangeTerm(val)} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12}>
            <Row gutter={[{ xs: 5, sm: 5, md: 10, lg: 15 }, 0]}>
              <Col span={12}>
                <Form.Item label="Лимит ответственности">
                  <InputNumber
                    controls
                    name="liability_limit"
                    placeholder="Введите сумму"
                  />
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

        <p>Место работы в качестве налогового консультанта </p>

        <WorakPlaces />
      </div>

      <div className="solo-checkbox">
        <Form.Item
          name="is_consultant"
          valuePropName="checked"
        >
          <Checkbox onChange={handleProvideServicesTaxConsultant}>Не оказываю услуги в качестве налогового консультанта</Checkbox>
        </Form.Item>
      </div>

      <div className="container">
        <p>Контактная информация</p>

        <Contacts />

        <p>Оказываемые услуги</p>

        <p className="subtitle">ЮРИДИЧЕСКИМ ЛИЦАМ</p>

        <CheckboxGroup value={legalEntities} onChange={handleChangeLegalEntities}>
          <Row>
            <Col span={24}>
              <Checkbox value={"checked-1"}>
                консультирование по вопросам налогообложения, в том числе в
                части применения налогового законодательства в конкретных
                ситуациях с учетом обстоятельств, имеющихся у консультируемого
                лица
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-2"}>
                подготовка рекомендаций (заключений) по вопросам
                налогообложения, включая определение оптимальных решений
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-3"}>
                оказание услуг по ведению бухгалтерского и (или) налогового
                учета, составлению отчетности, налоговых деклараций (расчетов) и
                иных документов, в том числе жалоб
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-4"}>
                представительство интересов в налоговых правоотношениях в
                налоговых и иных государственных органах, организациях на
                основании договора возмездного оказания услуг по налоговому
                консультированию
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-5"}>
                проведение независимой оценки соблюдения налогового
                законодательства консультируемыми лицами
              </Checkbox>
            </Col>
          </Row>
        </CheckboxGroup>

        <p className="subtitle">ИНДИВИДУАЛЬНЫМ ПРЕДПРИНИМАТЕЛЯМ</p>

        <CheckboxGroup value={individualEntrepreneurs} onChange={handleChangeIndividualEntrepreneurs}>
          <Row>
            <Col span={24}>
              <Checkbox value={"checked-1"}>
                консультирование по вопросам налогообложения, в том числе в
                части применения налогового законодательства в конкретных
                ситуациях с учетом обстоятельств, имеющихся у консультируемого
                лица
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-2"}>
                подготовка рекомендаций (заключений) по вопросам
                налогообложения, включая определение оптимальных решений
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-3"}>
                оказание услуг по ведению учета доходов и расходов и (или)
                налогового учета, составлению налоговых деклараций (расчетов) и
                иных документов, в том числе жалоб
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-4"}>
                представительство интересов в налоговых правоотношениях в
                налоговых и иных государственных органах, организациях на
                основании договора возмездного оказания услуг по налоговому
                консультированию
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-5"}>
                проведение независимой оценки соблюдения налогового
                законодательства консультируемыми лицами
              </Checkbox>
            </Col>
          </Row>
        </CheckboxGroup>

        <p className="subtitle">ФИЗИЧЕСКИМ ЛИЦАМ</p>

        <CheckboxGroup value={individualPerson} onChange={handleChangeIndividualPerson}>
          <Row>
            <Col span={24}>
              <Checkbox checked value={"checked-1"}>
                консультирование по вопросам налогообложения, в том числе в
                части применения налогового законодательства в конкретных
                ситуациях с учетом обстоятельств, имеющихся у консультируемого
                лица
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-2"}>
                подготовка рекомендаций (заключений) по вопросам
                налогообложения, включая определение оптимальных решений
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-3"}>
                оказание услуг по составлению налоговых деклараций (расчетов) и
                иных документов, в том числе жалоб
              </Checkbox>
            </Col>
            <Col span={24}>
              <Checkbox value={"checked-4"}>
                представительство интересов в налоговых правоотношениях в
                налоговых и иных государственных органах, организациях на
                основании договора возмездного оказания услуг по налоговому
                консультированию
              </Checkbox>
            </Col>
          </Row>
        </CheckboxGroup>

        <Form.Item className="form-profile-btn">
          <Button htmlType="primary">Сохранить</Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default Profile;
