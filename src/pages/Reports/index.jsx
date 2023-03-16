import { useEffect, useState } from 'react';
import { Space } from 'antd';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import BaseTemplate from 'templates';
import Title from 'components/Title';
import FormReports from 'components/FormReports';
import TableReports from 'components/TableReports';
import openNotification from 'components/Toasts';

const Reports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request
      .get(`${BASE_URL.REPORTS}`)
      .then((response) => {
        const newData = response.data.results.map((item) => {
          item.key = item.id;
          return item;
        });
        setData(newData);
      })
      .catch((err) => {
        openNotification(false, err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <BaseTemplate>
      <div className="container">
        <Title>Отчет о заключенных договорах по налоговому консультированию</Title>

        <Space
          direction="vertical"
          size={30}
          style={{ width: '100%' }}
        >
          <FormReports />
        </Space>

        <TableReports
          data={data}
          loading={loading}
          tableLayout="auto"
          scroll={{ x: 900 }}
        />
      </div>
    </BaseTemplate>
  );
};

export default Reports;
