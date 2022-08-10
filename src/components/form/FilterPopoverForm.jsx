import React, { useState, useContext } from "react";
import {
  Form,
  Select,
  Checkbox,
  Input,
  Space,
  Button,
  DatePicker
} from 'antd';
// URL
import { BASE_URL } from '../../utils/api/url';
// HELPERS
import filterSearchQueries from '../../utils/helpers/filterSearchQueries';
// COMPONENTS
import fileTypeIcon from '../UI/icons/Files';
// AXIOS
import request from '../../utils/api/axios';
import Context from '../../utils/context/Context';

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
}

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


const FilterPopoverForm = () => {
  const state = useContext(Context);
  const [form] = Form.useForm();
  const [dateRange, setDateRange] = useState([]);
  const handlerDataRange = (_, dateString) => setDateRange(dateString);

  const onFinish = (value) => {
    const search = filterSearchQueries(value, dateRange);

    if (search !== '' ) {
      state.dispatch({type: 'CONTENT_IS_LOADED', payload: {loaded: true}});
  
      request.get(`${BASE_URL.SEARCH}${search}`)
        .then(res => {
          state.dispatch({type: 'SHOW_FILTERED', payload: {
            filtered: {
              folders: [],
              documents: res?.data,
            },
          }})
        })
        .catch((error) => {
          console.Error(error);
        })
        .finally(() => state.dispatch({type: 'CONTENT_IS_LOADED', payload: {loaded: false}}));
    }
  }
  
  const handleClearForm = () => {
    setDateRange([]);
    form.resetFields();
    state.dispatch({type: 'SHOW_FILTERED', payload: state})
  };

  return (
    <Form
      {...layout}
      style={{
        minWidth: '422px',
      }}
      className='filter-popover-form'
      initialValues={initialValues}
      form={form}
      onFinish={onFinish}
    >
      <Item
        label="Тип"
        name="type"
      >
        <Select
          allowClear
        >
          {
            fileTypeOptions.map((elem, id) => (
              <Option
                key={id + elem.value}
                value={elem.value}
              >
                <div className="flex-align-center">
                  {fileTypeIcon(elem.value, {
                    style: { marginRight: '10px' }
                  })}
                  {elem.title}
                </div>
              </Option>
            ))
          }
        </Select>
      </Item>

      <Item
        label="Дата изменения"
        name="dataRange"
      >
        <RangePicker onChange={handlerDataRange} />
      </Item>

      <Item
        label="Содержит слова"
        name="keywords"
      >
        <Input />
      </Item>

      <Item
        name="checkboxGroup"
      >
        <Group>
          <Checkbox
            value="like"
          >
            Избранное
          </Checkbox>

          <Checkbox
            value="marked"
          >
            Рекомендации
          </Checkbox>
        </Group>
      </Item>

      <Space>
        <Button
          type='text'
          onClick={handleClearForm}
          className="filter-popover-form__btn-reset"
        >
          Сбросить
        </Button>

        <Button 
          type="primary" 
          htmlType='submit'
          className="filter-popover-form__btn__submit"
        >
          Поиск
        </Button>
      </Space>
    </Form>
  )
};

export default FilterPopoverForm;