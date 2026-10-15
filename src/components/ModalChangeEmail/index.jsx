import { useContext, useState } from 'react';
import {
  Button, Modal, Form, Input, Tooltip,
} from 'antd';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import openNotification from 'components/Toasts';
import Context from 'context/Context';

const ModalChangeEmail = () => {
  const [form] = Form.useForm();
  const { state, setState } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentEmail = state?.user?.email;

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async ({ email }) => {
    if (email === currentEmail) {
      setOpen(false);
      return;
    }

    setLoading(true);
    try {
      await request.patch(`${BASE_URL.USER}`, { email });
      setState((prev) => ({ ...prev, user: { ...prev.user, email } }));
      openNotification('OK');
      setOpen(false);
    } catch (error) {
      openNotification(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip placement="bottom" title="Изменить e-mail">
        <Button
          type="text"
          htmlType="button"
          onClick={() => setOpen(true)}
        >
          <span style={{ fontSize: '20px', lineHeight: 0 }}>@</span>
        </Button>
      </Tooltip>

      <Modal
        title="Изменить e-mail"
        open={open}
        onCancel={handleCancel}
        afterClose={() => form.resetFields()}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
            Сохранить
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="change-email"
          onFinish={onFinish}
          layout="vertical"
          initialValues={{ email: currentEmail }}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input placeholder="Введите e-mail" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalChangeEmail;
