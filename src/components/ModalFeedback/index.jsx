import React, { useState } from 'react';
import {
  Button, Modal, Form, notification, Upload, Input,
} from 'antd';
import { QuestionCircleOutlined, InboxOutlined } from '@ant-design/icons';

// API
import { BASE_URL } from 'api/url';
import request from 'api/axios';

// COMPONENTS
import Title from './Title';

// COMMON
import styles from './styles.module.scss';

const { TextArea } = Input;
const { Item } = Form;

const openNotification = (status) => {
  if (status) {
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

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
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
        formData.append('docs', file);
      });

      Object.entries(value).forEach(([key, val]) => formData.append(key, val === undefined ? '-' : val));

      const res = await request.post(`${BASE_URL.APIAL}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res?.status >= 200 && res?.status < 300) {
        openNotification(true);
        form.resetFields();
        setFileList([]);
      }

      setLoading(false);
    } catch (error) {
      openNotification(false);
      setLoading(false);
    }
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
          <Item
            rules={[
              {
                required: true,
              },
            ]}
            name="title"
            label="Подробное описание вопроса, ситуации с указанием норм действующего законодательства"
          >
            <TextArea
              showCount
              maxLength={1000}
              autoSize={{ minRows: 2, maxRows: 10 }}
              placeholder="Поле недолжно быть пустым, поставьте '-'!"
            />
          </Item>
          <Item
            rules={[
              {
                required: true,
              },
            ]}
            name="common_or_not"
            label="Ситуация распространенная или единичный случай"
          >
            <TextArea
              showCount
              maxLength={1000}
              autoSize={{ minRows: 2, maxRows: 10 }}
              placeholder="Поле недолжно быть пустым, поставьте '-'!"
            />
          </Item>
          <Item
            rules={[
              {
                required: true,
              },
            ]}
            name="suggestions"
            label="Ваши предложения о возможном порядке применения указанной нормы законодательства или ее корректировки для урегулирования вопроса, ситуации"
          >
            <TextArea
              showCount
              maxLength={1000}
              autoSize={{ minRows: 2, maxRows: 10 }}
              placeholder="Поле недолжно быть пустым, поставьте '-'!"
            />
          </Item>
          <Item
            name="appeal"
            label="Ваш вариант текста обращения от ПНК в государственные органы за разъяснением и урегулированием сложившейся ситуации"
          >
            <TextArea
              showCount
              maxLength={1000}
              autoSize={{ minRows: 2, maxRows: 10 }}
              defaultValue="-"
            />
          </Item>

          <Item
            valuePropName="fileList"
            getValueFromEvent={getFileValueFromEvent}
            noStyle
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
          </Item>
        </Form>
      </Modal>
    </>
  );
}

export default ModalFeedback;
