import { useContext } from "react";
// ANTD
import { Form } from 'antd';
// COMPONENTS
import decorIcon from '../UI/icons/decors';
import Popover from '../Popover';
import FilterPopoverForm from './FilterPopoverForm';
// URL
import { BASE_URL } from '../../utils/api/url';
// AXIOS
import request from '../../utils/api/axios';
// CONTEXT
import Context from "../../utils/context/Context";

const { Item } = Form;

const initialValues = {
  titleName: ''
};

const SearchForm = () => {
  const { state, setState, setLoaded } = useContext(Context);
  const [form] = Form.useForm();

  const handlerFiltered = (value) => {
    const { titleName } = value;

    if (titleName !== '' && titleName !== undefined) {
      
      request.get(`${BASE_URL.SEARCH}title=${titleName}`)
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
  };
  
  const handleClearForm = () => {
    form.resetFields();
    setLoaded(false);
    setState({...state, filtered: null});
  };

  return (
    <div className="search-box">
      <Form 
        className="search-box__form"
        initialValues={initialValues}
        onFinish={handlerFiltered}
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