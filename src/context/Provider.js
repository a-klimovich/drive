import { useEffect, useState } from 'react';
import { BASE_URL } from 'api/url';
// AXIOS
import request from 'api/axios';
import Context from './Context';

function Provider(props) {
  const { children } = props;
  const [loaded, setLoaded] = useState(true);
  const [state, setState] = useState({});

  useEffect(() => {
    request.get(BASE_URL.API)
      .then((response) => {
        setLoaded(true);
        setState({
          ...response.data.elements,
          filtered: null,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.Error(error);
      })
      .finally(() => setLoaded(false));
  }, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    loaded, setLoaded, state, setState,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
