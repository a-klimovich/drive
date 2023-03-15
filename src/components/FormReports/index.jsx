import React, { useState } from 'react';
import {
  Form, Input, Button, Upload, Space,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import openNotification from 'components/Toasts';

const FormWithFileUpload = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const getFileValueFromEvent = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e.fileList;
  };

  const onFinish = async (value) => {
    try {
      const formData = new FormData();

      fileList.forEach((file) => {
        // TODO: change name files to ? (wait bacck-end)
        formData.append('files', file);
      });

      Object.entries(value).forEach(([key, val]) => formData.append(key, val === undefined ? '-' : val));

      const res = await request.post(`${BASE_URL.REPORTS}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res?.status >= 200 && res?.status < 300) {
        openNotification('OK');
        form.resetFields();
        setFileList([]);
      }
    } catch (error) {
      openNotification(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Space
        size={24}
        direction="vertical"
      >
        <Form.Item
          valuePropName="fileList"
          getValueFromEvent={getFileValueFromEvent}
          noStyle
        >
          <Space
            size={20}
          >
            <Upload.Dragger
              name="files"
              {...uploadProps}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить</p>
              <p className="ant-upload-hint">Поддержка одиночной или массовой загрузки.</p>
            </Upload.Dragger>
          </Space>
        </Form.Item>

        <Form.Item
          name="comment"
          label="Комментарий"
          direction="vertical"
        >
          <Input.TextArea
            autoSize={{
              minRows: 2,
              maxRows: 6,
            }}
          />
        </Form.Item>
      </Space>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormWithFileUpload;
