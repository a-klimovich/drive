import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row, Col, Typography, Button, Tooltip,
} from 'antd';
import {
  FormOutlined, SnippetsOutlined, ReconciliationOutlined, HomeOutlined,
} from '@ant-design/icons';
import decorIcon from 'components/Icons/decors';
import SearchForm from 'components/Form/SearchForm';
import ModalFeedback from 'components/ModalFeedback';

import Context from 'context/Context';

const { Link, Title } = Typography;

const Header = () => {
  const navigate = useNavigate();
  const { state } = useContext(Context);

  const handleRedirectHome = () => {
    navigate('/');
  };

  const handleRedirectProfile = () => {
    navigate('/user/');
  };
  const handleRedirectApeals = () => {
    navigate('/appeals/');
  };
  const handleRedirectReports = () => {
    navigate('/reports/');
  };

  return (
    <header>
      <Row className="header-content" wrap="none">
        <Col flex="1 1 auto" sm={{ flex: '1 1 250px' }} order={1}>
          <div className="header__user-name">
            {decorIcon('user', {
              style: {
                marginRight: '12px',
              },
            })}
            <Title
              className="title"
              level={5}
            >
              Здравствуйте!
              {' '}
              { state?.user?.name }
            </Title>

            <Tooltip placement="bottomLeft" title="Хранилище">
              <Button
                type="text"
                htmlType="button"
                onClick={handleRedirectHome}
              >
                <HomeOutlined
                  style={{ fontSize: '20px' }}
                />
              </Button>
            </Tooltip>

            <Tooltip placement="bottomLeft" title="Анкета">
              <Button
                type="text"
                htmlType="button"
                onClick={handleRedirectProfile}
              >
                <FormOutlined
                  style={{ fontSize: '20px' }}
                />
              </Button>
            </Tooltip>

            <ModalFeedback />

            <Tooltip placement="bottom" title="Обращения налоговых консультантов">
              <Button
                type="text"
                htmlType="button"
                onClick={handleRedirectApeals}
              >
                <SnippetsOutlined
                  style={{ fontSize: '20px' }}
                />
              </Button>
            </Tooltip>

            <Tooltip placement="bottom" title="Отчеты о заключенных договорах">
              <Button
                type="text"
                htmlType="button"
                onClick={handleRedirectReports}
              >
                <ReconciliationOutlined
                  style={{ fontSize: '20px' }}
                />
              </Button>
            </Tooltip>
          </div>
        </Col>

        <Col xs={{ order: 3 }} sm={{ order: 2 }} flex="1 1 auto">
          <div className="header__search-wrapper">
            <SearchForm />
          </div>
        </Col>

        <Col xs={{ order: 2 }} flex="0 1 60px">
          <div className="logout-btn-wraper">
            <Link href="https://lk.pnkbel.by/logout/" className="header__logout-btn">
              {decorIcon('logOut')}
            </Link>
          </div>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
