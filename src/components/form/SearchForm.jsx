import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import { BASE_URL } from 'api/url';
import Context from 'context/Context';
import debounce from 'utils/debounce';
import decorIcon from 'components/Icons/decors';
import Popover from 'components/Popover';
import FilterPopoverForm from 'components/Form/FilterPopoverForm';

const { Item } = Form;

const SearchForm = () => {
  const {
    state, setState, setUpdate, update,
  } = useContext(Context);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const updateValue = debounce((vel) => {
    if (vel === '') {
      setUpdate(!update);
    }

    if (vel !== undefined && vel !== '') {
      navigate('/');
      setState({
        ...state,
        request_path: {
          base: BASE_URL.SEARCH,
          params: `?title=${vel}`,
        },
      });
    }
  }, 300);

  return (
    <div className="search-box">
      <Form
        className="search-box__form"
        initialValues={{
          titleName: '',
        }}
        onValuesChange={({ titleName }) => updateValue(titleName)}
        form={form}
      >
        <button
          className="btn-submit"
          type="submit"
        >
          {decorIcon('search')}
        </button>

        <Item
          name="titleName"
          style={{
            marginBottom: 0,
            width: '100%',
          }}
        >
          <input
            type="text"
            placeholder="Поиск в моём кабинете"
            style={{
              border: 'none',
            }}
          />
        </Item>
      </Form>

      <Popover
        content={FilterPopoverForm}
      >
        <button type="button">
          {decorIcon('filterOptions')}
        </button>
      </Popover>
    </div>
  );
};

export default SearchForm;
