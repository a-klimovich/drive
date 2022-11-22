import { useState } from 'react';
import {
  Form, Input, Upload,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Item } = Form;

function FormFields() {
  const [fileList, setFileList] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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

  return (
    <>
      <Item
        rules={[
          {
            required: true,
          },
        ]}
        name="title"
        label="Подробное описание вопроса."
      >
        <TextArea
          showCount
          maxLength={1000}
          autoSize={{ minRows: 2, maxRows: 10 }}
          placeholder="Подробное описание вопроса, ситуации с указанием норм действующего законодательства"
        />
      </Item>
      <Item
        rules={[
          {
            required: true,
          },
        ]}
        name="common_or_not"
        label="Как часто?"
      >
        <TextArea
          showCount
          maxLength={1000}
          autoSize={{ minRows: 2, maxRows: 10 }}
          placeholder="Ситуация распространенная или единичный случай"
        />
      </Item>
      <Item
        rules={[
          {
            required: true,
          },
        ]}
        name="suggestions"
        label="Ваши предложения."
      >
        <TextArea
          showCount
          maxLength={1000}
          autoSize={{ minRows: 2, maxRows: 10 }}
          placeholder="Ваши предложения о возможном порядке применения указанной нормы законодательства или ее корректировки для урегулирования вопроса, ситуации"
        />
      </Item>
      <Item name="appeal" label="Ваш вариант текста обращения.">
        <TextArea
          showCount
          maxLength={1000}
          autoSize={{ minRows: 2, maxRows: 10 }}
          placeholder="Ваш вариант текста обращения от ПНК в государственные органы за разъяснением и урегулированием сложившейся ситуации"
        />
      </Item>

      <Item name="docs" valuePropName="fileList" getValueFromEvent={normFile} noStyle maxCount={1}>
        <Upload.Dragger name="files" {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
      </Item>
    </>
  );
}

export default FormFields;
