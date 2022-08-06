import { useState, useEffect } from "react";
import Context from "./Context";
// import { data as mockedData } from "./_mocks";
// AXIOS
import request from '../../utils/api/axios';

const getData = () => request.get('/api');

const Provider = ({ children }) => {
  const [data, setFolders] = useState({});

  useEffect(() => {
    getData().then(res => setFolders(res?.data))
  }, []);

  const value = {
    data
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
