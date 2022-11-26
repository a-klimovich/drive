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
        label="Подробное описание вопроса, ситуации с указанием норм действующего законодательства"
      >
        <TextArea
          showCount
          maxLength={1000}
          autoSize={{ minRows: 2, maxRows: 10 }}
          placeholder="Поле недолжно быть пустым поставте '-'!"
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
          placeholder="Поле недолжно быть пустым поставте '-'!"
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
          placeholder="Поле недолжно быть пустым поставте '-'!"
        />
      </Item>
      <Item name="appeal" label="Ваш вариант текста обращения от ПНК в государственные органы за разъяснением и урегулированием сложившейся ситуации">
        <TextArea
          showCount
          maxLength={1000}
          autoSize={{ minRows: 2, maxRows: 10 }}
          placeholder="Поле недолжно быть пустым поставте '-'!"
        />
      </Item>

      <Item name="docs" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
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
    </>
  );
}

export default FormFields;
