import { Card, Form, Button, Input, Typography } from 'antd';
// COMPONENTS
import CenteredContent from "../../components/CenteredContent"
import Title from "../../components/UI/Title";
import authImageBG from '../../assets/image/bg-lines.jpg';

const { Paragraph } = Typography;

const ResetPassword = () => {
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
          title={<Title>Восстановление пароля</Title>}
          bordered={false}
          style={{ width: '592px' }}
        >
          <Paragraph>
            Забыли пароль? Введите свой адрес электронной почты ниже,
            и мы вышлем вам инструкцию, как установить новый пароль
          </Paragraph>

          <Form
            name="reset-password"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
            validateTrigger={'onBlur'}
          >
            
            <Form.Item
              label='E-mail'
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Хм... это не похоже на обычный E-mail!',
                },
                {
                  required: true,
                  message: 'Вы не ввели E-mail!',
                },
              ]}
              labelCol={{span: 24}}
            >
              <Input placeholder='Адрес электронной почты'/>
            </Form.Item>

            <Form.Item
              style={{
                justifyContent: 'end',
                display: 'flex',
              }}
            >
              <Button type='custom' htmlType="submit" className="login-form-button">
                Восстановить пароль
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </CenteredContent>
    </div>
  )
}

export default ResetPassword;