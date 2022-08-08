import { useState } from 'react';
// COMPONENTS
import Container from "../Container";
import decorIcon from "../UI/icons/decors";
import Title from "../UI/Title";
import SearchForm from "../form/SearchForm";
import Checkbox from "../checkbox/CheckBox";

export default function Header(props) {
  const { userName } = props;
  const [checkedFavorite, setCheckedFavorite] = useState(false);
  const [checkedRecommend, setCheckedRecommend] = useState(false);

  const handleChangeFavorite = () => {
    setCheckedFavorite(!checkedFavorite);
  };

  const handleChangeRecommend = () => {
    setCheckedRecommend(!checkedRecommend);
  };

  return (
    <header>
      <Container>
        <div className="header-content">
          <div className="header__user-name">
            {decorIcon("user", {
              style: {
                marginRight: '12px',
              }
            })}
            <Title>{`Здравствуйте! ${userName}`}</Title>
          </div>

          <div className="header__search-wrapper">
            <Checkbox
              label={decorIcon("star", {
                style: {
                  width: '18px',
                  height: '18px',
                  fill: `${checkedFavorite ? '#FFC107' : '#B3B5B7'}`
                }
              })}
              value={checkedFavorite}
              onChange={handleChangeFavorite}
              style={{ marginRight: '26px' }}
            />

            <Checkbox
              label={decorIcon("heart", {
                style: {
                  width: '18px',
                  height: '16px',
                  fill: `${checkedRecommend ? '#FC4D4D' : '#B3B5B7'}`
                }
              })}
              value={checkedRecommend}
              onChange={handleChangeRecommend}
              style={{ marginRight: '26px' }}
            />
            
            <SearchForm />
          </div>

          <button className="header__logout-btn">{decorIcon("logOut")}</button>
        </div>
      </Container>
    </header>
  );
}
