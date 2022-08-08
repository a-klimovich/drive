import { useState, useEffect } from "react";
import Context from "./Context";
import { BASE_URL } from '../api/url';
// AXIOS
import request from '../../utils/api/axios';

// const getData = () => request.get('/api');

const Provider = ({ children, setNewValue }) => {
  const [data, setFolders] = useState({});

  useEffect(() => {
    request.get(BASE_URL.API)
      .then(res => setFolders(res?.data))
  }, []);

  const value = {
    data,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
