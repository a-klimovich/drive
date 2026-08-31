import { useState, useEffect, useContext } from 'react';
import {
  DatePicker,
  Radio,
  Checkbox,
  Input,
  InputNumber,
  Row,
  Col,
  Form,
  Button,
  Typography,
  Upload,
} from 'antd';
import Context from 'context/Context';
import {
  dataFormatter,
  dateToStringFormater,
  normalizeValue,
} from 'utils/normalizeFormValue';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import BaseTemplate from 'templates';
import Loader from 'components/Loader';
import openNotification from 'components/Toasts';
import baseConfig from 'config';

import PersonalDate from './__common/PersonalDate';
import Membership from './__common/Membership';
import WorakPlaces from './__common/WorakPlaces';
import Contacts from './__common/Contacts';
import Insurance from './__common/Insurance';
import initialValue from './initial';
import config from './config';

const { Text, Paragraph } = Typography;
const { Group: CheckboxGroup } = Checkbox;

const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png'];
const MAX_PHOTO_SIZE = 512 * 1024;
const PHOTO_ASPECT_RATIO = 3 / 4;
const PHOTO_ASPECT_RATIO_TOLERANCE = 0.02;

const getImageAspectRatio = (file) => new Promise((resolve) => {
  const image = new Image();
  const url = URL.createObjectURL(file);

  image.onload = () => {
    URL.revokeObjectURL(url);
    resolve(image.width / image.height);
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    resolve(null);
  };
  image.src = url;
});

const beforePhotoUpload = async (file) => {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    openNotification('warning', 'Можно загрузить только файлы JPG или PNG');
    return Upload.LIST_IGNORE;
  }

  if (file.size > MAX_PHOTO_SIZE) {
    openNotification('warning', 'Размер файла не должен превышать 512 КБ');
    return Upload.LIST_IGNORE;
  }

  const aspectRatio = await getImageAspectRatio(file);
  if (!aspectRatio || Math.abs(aspectRatio - PHOTO_ASPECT_RATIO) > PHOTO_ASPECT_RATIO_TOLERANCE) {
    openNotification('warning', 'Фото должно иметь соотношение сторон 3:4');
    return Upload.LIST_IGNORE;
  }

  return false;
};

const getPhotoFromEvent = (e) => (Array.isArray(e) ? e : e?.fileList);

const Profile = () => {
  const [form] = Form.useForm();
  const { state, setLoaded, loaded } = useContext(Context);
  const { user } = state;

  const [dataRangeInsurance, setDataRangeInsurance] = useState(null);
  const [periodInsuranceStart, setPeriodInsuranceStart] = useState(null);

  const [qualification, setQualification] = useState('');
  const [currency, setCurrency] = useState('');
  const [education, setEducation] = useState([]);
  const [services, setServices] = useState([]);
  const [photoFileList, setPhotoFileList] = useState([]);
  const [provideServicesTaxConsultant, setProvideServicesTaxConsultant] = useState(false);

  const handleChangeQualification = (e, val) => setQualification(e?.target?.value || val);
  const handleCurrencyValue = (e, val) => setCurrency(e?.target?.value || val);

  const handleProvideServicesTaxConsultant = (checkedValues) => {
    setProvideServicesTaxConsultant(checkedValues.target.checked);
  };
  const handleChangeEducation = (checkedValues) => setEducation(checkedValues);
  const handleChangeServices = (checkedValues) => setServices(checkedValues);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(normalizeValue(user));

      handleChangeQualification({}, user?.qualification);
      handleCurrencyValue({}, user?.currency);
      handleChangeServices(user?.services);
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
      date_course,
      photo,
      ...restValues
    } = values;

    const updateValue = {
      ...restValues,
      currency,
      qualification,

      high_education: education,
      is_consultant: provideServicesTaxConsultant,
      services,

      date_insurance_start: dateToStringFormater(dataRangeInsurance),
      period_insurance_start: dateToStringFormater(periodInsuranceStart),

      date_insurance_from: dataFormatter(date_insurance_from),
      date_certificate_stop: dataFormatter(date_certificate_stop),
      date_certificate_start: dataFormatter(date_certificate_start),
      date_membership_exclusion: dataFormatter(date_membership_exclusion),
      date_membership_start: dataFormatter(date_membership_start),
      date_membership_stop: dataFormatter(date_membership_stop),
      date_certificate_renew: dataFormatter(date_certificate_renew),
      date_course: dataFormatter(date_course),
    };

    const photoFile = photo?.[0]?.originFileObj;

    let payload = updateValue;
    let requestConfig;

    if (photoFile) {
      const formData = new FormData();
      formData.append('photo', photoFile);
      Object.entries(updateValue).forEach(([key, val]) => {
        const isPlainValue = val === null || typeof val !== 'object';
        formData.append(key, isPlainValue ? val ?? '' : JSON.stringify(val));
      });
      payload = formData;
      requestConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    }

    // REQUEST
    request
      .patch(`${BASE_URL.USER}`, payload, requestConfig)
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
    <BaseTemplate>
      <Loader loading={loaded}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialValue}
          className="profile-settings-form"
          scrollToFirstError
          validateTrigger="onSubmit"
        >
          <div className="checkbox-hide-me__wrapper">
            <Form.Item name="is_hidden" valuePropName="checked">
              <Checkbox>
                <b>HE</b>
                {' '}
                отображать мои данные на сайте ПНК
              </Checkbox>
            </Form.Item>
          </div>
          <br />

          <div className="container mb-3">
            <Paragraph>
              <Text type="danger">*</Text>
              {' '}
              - отмечены поля обязательные для
              заполнения
            </Paragraph>
          </div>

          <div className="container mb-3">
            <Row>
              <Col xs={24}>
                <Form.Item
                  name="photo"
                  label="Загрузить фото"
                  valuePropName="fileList"
                  getValueFromEvent={getPhotoFromEvent}
                >
                  <Paragraph>
                    Добавить ваше изображение в формате 3:4 с максимальным
                    размером файла до 512 КБ
                  </Paragraph>
                  <Upload
                    accept=".jpg,.jpeg,.png"
                    maxCount={1}
                    beforeUpload={beforePhotoUpload}
                    fileList={photoFileList}
                    onChange={({ fileList }) => setPhotoFileList(fileList)}
                  >
                    <Button>Выбрать файл</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="container mb-3">
            <PersonalDate />

            <p className="centered mb-3">Член ПНК</p>

            <Membership />

            <p className="required-mark">Квалификация, как в аттестате:</p>

            <Form.Item name="qualification">
              <Radio.Group
                options={config.qualification}
                onChange={handleChangeQualification}
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
              <CheckboxGroup onChange={handleChangeEducation}>
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

          <div className="container">
            <Form.Item>
              <Row>
                <Col xs={24} sm={12} md={12} lg={8}>
                  <Form.Item
                    name="experience"
                    label="Стаж работы:"
                  >
                    <Input placeholder="30 лет" />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </div>

          <div className="container">
            <Form.Item>
              <Row>
                <Col xs={24} sm={12} md={12} lg={8}>
                  <Form.Item
                    name="date_course"
                    label="Дата прохождения обучения:"
                  >
                    <DatePicker
                      placeholder="Выберите дату"
                      format={config.dateFormat}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          </div>

          <div className="container">
            <p className="centered mb-3">Договор страхования ответственности</p>

            <Insurance
              provideServicesTaxConsultant={provideServicesTaxConsultant}
            />

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
                    format={baseConfig.dateFormat}
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
                    format={baseConfig.dateFormat}
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
                    <Form.Item
                      name="liability_limit"
                      label="Лимит ответственности"
                    >
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

            <p className="centered mb-3">
              Место работы в качестве налогового консультанта
              {' '}
            </p>

            <WorakPlaces />
          </div>

          <div className="container">
            <p className="centered mb-3">Контактная информация</p>

            <div className="mb-3">
              <Contacts />
            </div>

            <p className="centered mb-3">Колличество заключенныйх договоров</p>

            <p className="centered mb-3">
              <Row>
                <Col xs={24} sm={12} md={12} lg={8}>
                  <Form.Item
                    name="contracts_count"
                    label="Колличество договоров"
                  >
                    <InputNumber placeholder="3" />
                  </Form.Item>
                </Col>
              </Row>
            </p>

            <p className="centered mb-3">
              Сферы деятельности консультируемого лица
            </p>

            <CheckboxGroup value={services} onChange={handleChangeServices}>
              <Row>
                {config.services.map((item) => (
                  <Col span={24} key={item.value}>
                    <Checkbox value={item.value}>
                      {item.text}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </CheckboxGroup>
          </div>

          <br />

          <div className="solo-checkbox bg-gray py-2 mb-2">
            <Form.Item name="is_consultant" valuePropName="checked">
              <Checkbox onChange={handleProvideServicesTaxConsultant}>
                Не оказываю услуги в качестве налогового консультанта
              </Checkbox>
            </Form.Item>
          </div>

          <div className="container">
            <Form.Item className="form-profile-btn">
              <Button htmlType="primary">Сохранить</Button>
            </Form.Item>
          </div>
        </Form>
      </Loader>
    </BaseTemplate>
  );
};

export default Profile;
