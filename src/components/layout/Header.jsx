import React, { useContext } from 'react';
// ANTD
import { Row, Col } from 'antd';
// COMPONENTS
import Container from '../Container';
import decorIcon from '../UI/icons/decors';
import Title from '../UI/Title';
import SearchForm from '../form/SearchForm';
import CheckBoxRecommend from '../checkbox/CheckBoxRecommend';
import CheckBoxFavorite from '../checkbox/CheckBoxFavorite';
// CONTEXT
import Context from '../../utils/context/Context';

export default function Header(props) {
  const { state } = useContext(Context);

  return (
    <header>
      <Container>
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
              <CheckBoxRecommend
                defaultValue={false}
                style={{ marginRight: '26px' }}
              />

              <CheckBoxFavorite
                defaultValue={false}
                style={{ marginRight: '26px' }}
              />

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
        {/* <div className="header-content"></div> */}
      </Container>
    </header>
  );
}
