import { useEffect, useState } from "react";
import Context from "./Context";
import { BASE_URL } from '../api/url';
// AXIOS
import request from '../../utils/api/axios';

const Provider = ({ children }) => {
  const [loaded, setLoaded] = useState(true);
  const [state, setState] = useState({});

  useEffect(() => {
    request.get(BASE_URL.API)
      .then((response) => {
        setLoaded(true);
        setState({
          ...response.data,
           filtered: null
        });
      })
      .catch((error) => {
        console.Error(error);
      })
      .finally(() => setLoaded(false));
  }, []);

  const value = {
    loaded,
    setLoaded,
    state,
    setState
  };

  return <Context.Provider value={value}>
    {children}
  </Context.Provider>;
};

export default Provider;
