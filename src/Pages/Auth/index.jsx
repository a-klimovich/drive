import { Card, Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
// COMPONENTS
import CenteredContent from "../../components/CenteredContent"
import Title from "../../components/UI/Title";
import decorIcon from "../../components/UI/icons/decors";
import authImageBG from '../../assets/image/bg-lines.jpg';

const Authorization = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${authImageBG})`,
      }}
    >
      <CenteredContent>
        <Card
          title={
            <div
              className='flex-align-center'
            >
              {decorIcon("user", {
                style: {
                  marginRight: '12px',
                }
              })}
              <Title>Авторизация</Title>
            </div>
          }
          bordered={false}
          style={{ width: '592px' }}
        >
          <Form
            name="login-form"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            validateTrigger={'onBlur'}
          >
            <Form.Item
              label='Логин'
              name="username"
              rules={[{required: true, message: 'Вы не ввели логин!' }]}
              labelCol={{span: 24}}
            >
              <Input placeholder='Введите логин'/>
            </Form.Item>

            <Form.Item
              label='Пароль'
              name="password"
              rules={[{ required: true, message: 'Вы не ввели пароль!' }]}
              autoComplete='off'
              labelCol={{span: 24}}
            >
              <Input.Password placeholder='Введите пароль'/>
            </Form.Item>

            <Link className="login-form-forgot" to="/reset-password" >
              Забыли пароль?
            </Link>

            <Form.Item
              style={{
                justifyContent: 'end',
                display: 'flex',
              }}
            >
              <Button type='custom' htmlType="submit" className="login-form-button">
                Войти
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </CenteredContent>
    </div>
  )
}

export default Authorization;