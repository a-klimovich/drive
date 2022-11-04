import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// ANTD
import { Form } from 'antd';
// COMPONENTS
import decorIcon from 'components/UI/icons/decors';
import Popover from 'components/Popover';
import FilterPopoverForm from 'components/form/FilterPopoverForm';
// URL
import { BASE_URL } from 'api/url';
// CONTEXT
import Context from 'context/Context';
// UTILS
import debounce from 'utils/debounce';

const { Item } = Form;

function SearchForm() {
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
          base: `${BASE_URL.SEARCH}/`,
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
}

export default SearchForm;
