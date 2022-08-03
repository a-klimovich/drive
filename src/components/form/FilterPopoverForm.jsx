
import { Form, Select, Checkbox, Input, Space, Button } from 'antd';

const { Item } = Form;
const { Option } = Select;
const { Group } = Checkbox;

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
  editDate: '',
  keywords: '',
  checkboxGroup: [],
}

const FilterPopoverForm = () => {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    // TODO: формировать высылать запрос по фильтрам
    console.log(value);
  }

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
      <Select>
        <Option value="all">Все</Option>
      </Select>
    </Item>

    <Item 
      label="Дата изменения"
      name="editDate"
    >
      <Select>
        <Option value="all">Все</Option>
      </Select>
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
        <Checkbox value="caused">Избранное</Checkbox>
        <Checkbox value="recommendation">Рекомендации</Checkbox>
      </Group>
    </Item>

    <Space>
      <Button
        type='text' 
        onClick={() => {
          form.resetFields();
        }}
      >
        Сбросить
      </Button>
      <Button type="primary" htmlType='submit'>Поиск</Button>
    </Space>
  </Form>)
};

export default FilterPopoverForm;