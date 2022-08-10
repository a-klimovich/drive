import { useEffect, useReducer } from "react";
import Context from "./Context";
import { BASE_URL } from '../api/url';
// AXIOS
import request from '../../utils/api/axios';

export const initialState = {
  loaded: true,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_BASE_DATA":
      console.log("GET_BASE_DATA", payload);

      return {
        ...state,
        base: payload.base
      };
      
    case "SHOW_FILTERED":
      console.log("SHOW_FILTERED", payload);

      return {
        ...state,
        filtered: payload.filtered
      };

    case "CONTENT_IS_LOADED":
      return {
        ...state,
        loaded: payload.loaded,
      };

    default:
      throw new Error('Ups... Store is done)');
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    request.get(BASE_URL.API)
      .then((response) => {
        dispatch({type: 'CONTENT_IS_LOADED', payload: {loaded: true}});
        dispatch({ 
          type: 'GET_BASE_DATA',
          payload: {
            base: response?.data
          },
        });
      })
      .catch((error) => {
        console.Error(error);
      })
      .finally(() => dispatch({type: 'CONTENT_IS_LOADED', payload: {loaded: false}}));
  }, []);

  const value = {
    loading: false,
    state,
    dispatch
  };

  return <Context.Provider value={value}>
    {children}
  </Context.Provider>;
};

export default Provider;
