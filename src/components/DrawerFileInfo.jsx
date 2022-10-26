import React, { useState } from 'react';
import {
  Button, Drawer, Row, Col, Typography,
} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

// COMPONENT
import DescriptionItem from './DescriptionItem';

const { Link } = Typography;

function DrawerFileInfo({ data, AddToFavorite, Recommended }) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="text" onClick={showDrawer} icon={<InfoCircleOutlined />} />
      <Drawer
        title="Информация о файле:"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Имя файла"
              content={data.name || data.title}
            />
          </Col>

          <Col span={24}>
            <DescriptionItem title="Создан" content={data.created_at || ''} />
          </Col>

          <Col span={24}>
            <DescriptionItem title="Обновлен" content={data.updated_at || ''} />
          </Col>

          <Col span={24}>
            <DescriptionItem title="Формат" content={data.extension || ''} />
          </Col>

          <Col span={24}>
            <DescriptionItem
              title="Ccылка"
              spaceBetweenContent
              content={(
                <Link
                  target="_blank"
                  href={data.file || ''}
                >
                  Скачать / Открыть
                </Link>
              )}
            />
          </Col>

          <Col span={24}>
            <DescriptionItem
              title="Избранный"
              content={AddToFavorite}
              spaceBetweenContent
            />
          </Col>

          <Col span={24}>
            <DescriptionItem
              title="Рекомендованный"
              content={Recommended}
              spaceBetweenContent
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
}

export default DrawerFileInfo;
