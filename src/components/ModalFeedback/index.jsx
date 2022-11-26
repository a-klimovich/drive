import React, { useState } from 'react';
import {
  Button, Modal, Form, notification,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

// API
import { BASE_URL } from 'api/url';
import request from 'api/axios';

// COMPONENTS
import Title from './Title';

// COMMON
import FormFields from './__common/FormFields';
import styles from './styles.module.scss';

const openNotification = (status) => {
  if (status === 'OK') {
    notification.success({
      message: 'Данные успешно отправлены! Спасибо',
      duration: 3.5,
    });
  } else {
    notification.error({
      message: 'Что-то пошло не так...',
      duration: 2.5,
    });
  }
};

function ModalFeedback() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (value) => {
    request
      .post(`${BASE_URL.APIAL}`, value, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response?.statusText === 'OK') {
          setTimeout(() => {
            setLoading(false);
            openNotification('OK');
          }, 500);
        }
      })
      .catch(() => {
        setLoading(false);
        openNotification(false);
      });
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        <QuestionCircleOutlined
          style={{
            fontSize: '20px',
          }}
        />
      </Button>

      <Modal
        title={(
          <Title
            title="Форма обращения налогового консультанта в ПНК по вопросам применения отдельных норм налогового законодательства"
          />
        )}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        loading={loading}
        width={1000}
        className={styles.modal}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Свернуть/Закрыть
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Отправить
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="feedback"
          onFinish={onFinish}
          layout="vertical"
        >
          <FormFields />
        </Form>
      </Modal>
    </>
  );
}

export default ModalFeedback;
