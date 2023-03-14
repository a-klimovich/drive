import { notification } from 'antd';

const openNotification = (status) => {
  if (status === 'OK') {
    notification.success({
      message: 'Данные успешно сохранены! Спасибо',
      duration: 3.5,
    });
  } else {
    notification.error({
      message: 'Что-то пошло не так...',
      duration: 2.5,
    });
  }
};

export default openNotification;
