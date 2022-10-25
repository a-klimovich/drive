import { useContext } from "react";
// ANTD
import { Form } from 'antd';
// COMPONENTS
import decorIcon from 'components/UI/icons/decors';
import Popover from 'components/Popover';
import FilterPopoverForm from 'components/form/FilterPopoverForm';
// URL
import { BASE_URL } from 'api/url';
// AXIOS
import request from 'api/axios';
// CONTEXT
import Context from "context/Context";

const { Item } = Form;

const initialValues = {
  titleName: ''
};

const SearchForm = () => {
  const { state, setState, setLoaded } = useContext(Context);
  const [form] = Form.useForm();
  
  const handleClearForm = () => {
    form.resetFields();
    setLoaded(false);
    setState({...state, filtered: null});
  };

  
  const debounce = (cb, delay = 1000) => {
    let timeout;
    
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
  }

  const updateValue = debounce((vel) => {
    if (vel !== '' && vel !== undefined) {
      
      request.get(`${BASE_URL.SEARCH}title=${vel}`)
        .then(setLoaded(true))
        .then(res => {
          setState({...state, filtered: {
            documents: res.data,
            folders: [],
          }});
        })
        .catch((error) => {
          console.Error(error);
        })
        .finally(() => setLoaded(false));
    } else handleClearForm();
  }, 300)
  
  return (
    <div className="search-box">
      <Form 
        className="search-box__form"
        initialValues={initialValues}
        // onFinish={handlerFiltered}
        onValuesChange={({ titleName }) => updateValue(titleName)}
        form={form}
      >
        <button
          className="btn-submit"
          type='submit'
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
        <button>
          {decorIcon('filterOptions')}
        </button>
      </Popover>
    </div>
  );
};

export default SearchForm;