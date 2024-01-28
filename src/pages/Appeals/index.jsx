import { useEffect, useState } from 'react';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import BaseTemplate from 'templates';
import TableAppeals from 'components/TableAppeals';
import openNotification from 'components/Toasts';
import Title from 'components/Title';

const Appeals = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request
      .get(`${BASE_URL.APIALS}`)
      .then((resp) => {
        const newData = resp.data.results.map((item) => {
          item.key = item.id;
          return item;
        });
        setResponse(newData);
      })
      .catch((err) => {
        openNotification(false, err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStatus = (val, id) => {
    request
      .post(`${BASE_URL.APIALS}/${id}`, { status: val })
      .catch((err) => {
        openNotification(false, err);
      });
  };

  return (
    <BaseTemplate>
      <div className="container">
        <Title>
          Обращения налоговых консультантов по вопросам
          применения отдельных норм налогового законодательства
        </Title>

        <TableAppeals data={response} loading={loading} handleStatus={handleStatus} />
      </div>
    </BaseTemplate>
  );
};

export default Appeals;
