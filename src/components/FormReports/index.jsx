import React, { useState } from 'react';
import {
  Form, Input, Button, Upload, Space, Row, Col,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { BASE_URL } from 'api/url';
import request from 'api/axios';
import openNotification from 'components/Toasts';

const FormWithFileUpload = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file) => {
      setFileList([file]);
      if (fileList.length > 0) {
        openNotification('warning', 'Можно загрузить только 1 файл');
        return false;
      }
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
        formData.append('file', file);
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
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={20} align="top">
        <Col span={12}>
          <Form.Item
            valuePropName="fileList"
            getValueFromEvent={getFileValueFromEvent}
            noStyle
          >
            <Upload.Dragger
              name="files"
              maxCount={1}
              {...uploadProps}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Нажмите или перетащите файл в эту область, чтобы загрузить</p>
              <p className="ant-upload-hint">Поддержка одиночной или массовой загрузки.</p>
            </Upload.Dragger>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Space style={{ width: '100%' }} direction="vertical">
            <Form.Item
              name="comment"
              label="Комментарий"
            >
              <Input.TextArea
                autoSize={{
                  minRows: 5,
                  maxRows: 5,
                }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginLeft: 'auto',
                  display: 'inherit',
                }}
              >
                Отправить
              </Button>
            </Form.Item>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default FormWithFileUpload;
