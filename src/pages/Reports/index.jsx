import { useEffect, useState } from 'react';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import BaseTemplate from 'templates';
import Title from 'components/Title';
import FormReports from 'components/FormReports';
import TableReports from 'components/TableReports';
import openNotification from 'components/Toasts';

const Reports = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request
      .get(`${BASE_URL.REPORTS}`)
      .then(({ data }) => {
        const newData = data.results.map((item) => {
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

  return (
    <BaseTemplate>
      <div className="container">
        <Title>Репорты</Title>

        <FormReports />

        <TableReports
          data={response}
          loading={loading}
        />
      </div>
    </BaseTemplate>
  );
};

export default Reports;
