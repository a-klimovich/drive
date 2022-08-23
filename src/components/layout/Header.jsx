import React, { useContext } from 'react';
// ANTD
import { Row, Col } from 'antd';
// COMPONENTS
import decorIcon from '../UI/icons/decors';
import Title from '../UI/Title';
import SearchForm from '../form/SearchForm';
// CONTEXT
import Context from '../../utils/context/Context';

export default function Header(props) {
  const { state } = useContext(Context);

  return (
    <header>
      <Row className="header-content" wrap="none">
        <Col 
          flex={'1 1 auto'}
          sm={{ flex: '1 1 250px' }}
          order={1}
        >
          <div className="header__user-name">
            {decorIcon('user', {
              style: {
                marginRight: '12px',
              },
            })}
            <Title>{`Здравствуйте! ${state?.user?.name}`}</Title>
          </div>
        </Col>

        <Col xs={{ order: 3 }} sm={{ order: 2 }} flex="1 1 auto">
          <div className="header__search-wrapper">
            <SearchForm />
          </div>
        </Col>

        <Col xs={{ order: 2 }} flex="0 1 60px">
          <div className="logout-btn-wraper">
            <button className="header__logout-btn">
              {decorIcon('logOut')}
            </button>
          </div>
        </Col>
      </Row>
    </header>
  );
}
