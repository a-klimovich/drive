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
        openNotification(false, err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseTemplate>
      <div className="container">
        <Title>
          Обращения налоговых консультантов по вопросам
          применения отдельных норм налогового законодательства
        </Title>

        <TableAppeals data={response} loading={loading} />
      </div>
    </BaseTemplate>
  );
};

export default Appeals;
