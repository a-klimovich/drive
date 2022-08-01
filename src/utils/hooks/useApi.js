import { useCallback, useState } from 'react';
import { notification as AntNotification } from 'antd';
// HELPERS
import { api } from '../api/axios';
// import { notificationConfig } from '@helpers/notificationConfig';
import uuid from '../helpers/uuid';

AntNotification.config({
  placement: 'topRight',
  left: 10,
  top: 85,
  duration: 4,
});

export default function useApi({
  url = '', method, notification, responseType = 'json',
} = {}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  // inProgress state holds an object, so that each request can track its progress in a separate property
  // this avoids a race condition if another request is sent before the previous ends
  const [inProgress, setInProgress] = useState({ });

  const action = useCallback(async (values, urlChange = '', overrideMethod = '') => {
    const requestId = uuid();
    setInProgress((old) => ({
      ...old,
      [requestId]: true,
    }));
    const type = overrideMethod.toLocaleLowerCase() || method.toLocaleLowerCase || 'delete';

    if (!(type in api)) throw new Error(`Unknown HTTP method '${ type }'`);

    const newUrl = urlChange !== '' ? `${ url }${ urlChange }` : url;
    try {
      const res = await api[type](newUrl, values, {
        responseType,
      });

      setResponse(res.data);

      if (notification !== null) {
        console.log('type', type);
        console.log('notification', notification);
      }

      return res.data;
    } catch (ex) {
      setError(ex);
      return null;
    }
  }, [method, notification, responseType, url]);

  const search = useCallback(async (searchUrl = '', urlChange = '') => {
    const requestId = uuid();
    setInProgress((old) => ({
      ...old,
      [requestId]: true,
    }));
    const newUrl = urlChange !== '' ? `${ url }${ urlChange }${ searchUrl }` : `${ url }${ searchUrl }`;
    try {
      const res = await api.get(newUrl, {
        responseType,
      });

      setResponse(res.data);
      return res.data;
    } catch (ex) {
      setError(ex);
      return null;
    }
  }, [url, responseType]);

  return {
    action,
    search,
    response,
    // loading: ,
    error,
  };
}
