import { useEffect, useState } from 'react';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import BaseTemplate from 'templates';
import TableAppeals from 'components/TableAppeals';
import openNotification from 'components/Toasts';
import Title from 'components/Title';

const Appeals = () => {
  const [response, setResponse] = useState([]);

  useEffect(() => {
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
      });
  }, []);

  // список всех заявок из формы с модалки которая уже есть по кнопке (?)

  return (
    <BaseTemplate>
      <div className="container">
        <Title>Обращения налоговых консультантов в госорганы</Title>

        <TableAppeals data={response} />
      </div>
    </BaseTemplate>
  );
};

export default Appeals;
