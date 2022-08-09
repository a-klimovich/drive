import { useState, useEffect, useReducer } from "react";
import Context from "./Context";
import { BASE_URL } from '../api/url';
// AXIOS
import request from '../../utils/api/axios';

function init(initialDate) {
  return initialDate;
}

function reducer(state, action) {
  switch (action.type) {
    case 'INITIAL_STATE':
      return init(action.payload);

    case 'SET_DATA':
      return action.payload

    case 'RESET_DATA':
      return init();

    default:
      throw new Error();
  }
};

const Provider = ({ children }) => {
  const [data, setFolders] = useState({});
  const [state, dispatch] = useReducer(reducer, data, init);

  useEffect(() => {
    request.get(BASE_URL.API)
      .then(res => {
        dispatch({type: 'INITIAL_STATE', payload: res?.data});
        return setFolders(res?.data)
      })
  }, []);

  return <Context.Provider value={{ state, dispatch }}>
    {children}
  </Context.Provider>;
};

export default Provider;
