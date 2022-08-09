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
  type: '',
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
  // const [searchDataResult, setSearchDataResult] = useState({});

  const findActiveCheckBox = (list, search) => list.find((val) => val === search);
  const handlerDataRange = (_, dateString) => setDateRange(dateString);
  const onFinish = (value) => {
    const { checkboxGroup = [], keywords = '', type = '' } = value;

    const startDate = dateRange.length < 0
      ? `&updated_at__gte=${dateRange[0]}`
      : '';

    const endDate = dateRange.length < 0
      ? `&updated_at__lt=${dateRange[1]}`
      : '';

    const keyText = keywords !== ''
      ? `&title=${keywords}`
      : '';

    const isRecommend = findActiveCheckBox(checkboxGroup, 'marked') !== undefined
      ? `&liked=${true}`
      : '';

    const isFollow = findActiveCheckBox(checkboxGroup, 'like') !== undefined
      ? `&marked=${true}`
      : '';

    const fileType = type !== ''
      ? `&ext=${type}`
      : '';

    request.get(`${BASE_URL.SEARCH}${keyText}${isRecommend}${isFollow}${fileType}${startDate}${endDate}`)
      .then(res => {
        // setSearchDataResult(res?.data)
        state.dispatch({type: 'SET_DATA', payload: {
          ...state.state,
          documents: res?.data,
        }})
      })
      .then(rej => console.log(rej));
  };
  
  const clearSearch = () => {
    setDateRange([])
    form.resetFields();
    state.dispatch({ type: 'RESET_DATA' })
  };

  // data.setNewData(searchDataResult);
  console.log(state.state);

  return (<Form
    {...layout}
    style={{
      minWidth: '422px',
    }}
    className='searchInputPop'
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
        <Checkbox value="like">Избранное</Checkbox>
        <Checkbox value="marked">Рекомендации</Checkbox>
      </Group>
    </Item>

    <Space>
      <Button
        type='text'
        onClick={clearSearch}
      >
        Сбросить
      </Button>
      <Button type="primary" htmlType='submit'>Поиск</Button>
    </Space>
  </Form>)
};

export default FilterPopoverForm;