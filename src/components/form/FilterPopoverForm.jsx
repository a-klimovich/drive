import React, { useState, useContext } from 'react';
import {
  Form, Select, Checkbox, Input, Space, Button, DatePicker,
} from 'antd';
// URL
import { BASE_URL } from 'api/url';
// HELPERS
import filterSearchQueries from 'helpers/filterSearchQueries';
// COMPONENTS
import fileTypeIcon from 'components/UI/icons/files';
// AXIOS
import request from 'api/axios';
import Context from 'context/Context';

const { Item } = Form;
const { Option } = Select;
const { Group } = Checkbox;
const { RangePicker } = DatePicker;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const initialValues = {
  type: null,
  keywords: '',
  checkboxGroup: [],
};

const fileTypeOptions = [
  { value: 'DOC', title: 'Документы' },
  { value: 'IMG', title: 'Изображения' },
  { value: 'MP4', title: 'Видео' },
  { value: 'PDF', title: 'Файл PDF' },
  { value: 'PPT', title: 'Презентации' },
  { value: 'WAV', title: 'Аудио' },
  { value: 'XLS', title: 'Таблицы' },
  { value: 'ZIP', title: 'Архивы' },
];

function FilterPopoverForm() {
  const { state, setState, setLoaded } = useContext(Context);
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState([]);
  const handlerDataRange = (_, dateString) => setDateRange(dateString);

  const handlerFiltered = (value) => {
    const search = filterSearchQueries(value, dateRange);

    if (search !== '') {
      request
        .get(`${BASE_URL.SEARCH}${search}`)
        .then(setLoaded(true))
        .then((res) => {
          setState({
            ...state,
            ...res.data,
          });
        })
        .finally(() => setLoaded(false));
    }
  };

  const handleClearForm = () => {
    form.resetFields();
    setLoaded(false);

    request
      .get(BASE_URL.API)
      .then((response) => {
        setLoaded(true);
        setState({
          ...response.data,
        });
      })
      .finally(() => setLoaded(false));
  };

  return (
    <Form
      {...layout}
      style={{
        minWidth: '422px',
      }}
      className="filter-popover-form"
      initialValues={initialValues}
      form={form}
      onFinish={handlerFiltered}
    >
      <Item label="Тип" name="type">
        <Select placeholder="Выберите тип файла" allowClear>
          {fileTypeOptions.map((elem) => (
            <Option key={elem.value} value={elem.value}>
              <div className="flex-align-center">
                {fileTypeIcon(elem.value, {
                  style: { marginRight: '10px' },
                })}
                {elem.title}
              </div>
            </Option>
          ))}
        </Select>
      </Item>

      <Item label="Дата изменения" name="dataRange">
        <RangePicker onChange={handlerDataRange} />
      </Item>

      <Item label="Содержит слова" name="keywords">
        <Input placeholder="Введите слова, найденные в файле" />
      </Item>

      <Item name="checkboxGroup">
        <Group>
          <Checkbox value="like">Избранное</Checkbox>

          <Checkbox value="marked">Рекомендации</Checkbox>
        </Group>
      </Item>

      <Space>
        <Button type="text" onClick={handleClearForm} className="filter-popover-form__btn-reset">
          Сбросить
        </Button>

        <Button type="primary" htmlType="submit" className="filter-popover-form__btn__submit">
          Поиск
        </Button>
      </Space>
    </Form>
  );
}

export default FilterPopoverForm;
