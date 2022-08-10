import { useState, useContext } from "react";
// ANTD
import { Form, Input } from 'antd';
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

const SearchForm = () => {
  const state = useContext(Context);
  const [form] = Form.useForm();

  const onFinish = (value) => {
    const { titleName } = value;

    if (titleName !== '' && titleName !== undefined) {
      state.dispatch({type: 'CONTENT_IS_LOADED', payload: {loaded: true}});
  
      request.get(`${BASE_URL.SEARCH}title=${titleName}`)
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

    return handleClearForm();
  }
  
  const handleClearForm = () => {
    form.resetFields();
    state.dispatch({type: 'SHOW_FILTERED', payload: state})
  };

  return (
    <div className="search-box">
      <Form 
        className="search-box__form"
        onFinish={onFinish}
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
        {/* <input
          
        /> */}
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