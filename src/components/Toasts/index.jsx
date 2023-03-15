import { notification } from 'antd';

const openNotification = (status, message) => {
  if (status === 'OK') {
    notification.success({
      message: message || 'Данные успешно сохранены! Спасибо',
      duration: 3.5,
    });
  } else {
    notification.error({
      message: message || 'Что-то пошло не так...',
      duration: 2.5,
    });
  }
};

export default openNotification;
