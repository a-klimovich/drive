import { useState } from 'react';
// COMPONENTS
import Container from "../helpers/Container";
import decorIcon from "../UI/icons/decors";
import Title from "../UI/Title";
import SearchForm from "../form/SearchForm";
import Checkbox from "../form/CheckBox";

export default function Header(props) {
  const { userName } = props;
  const [checkedOne, setCheckedOne] = useState(false);

  const handleChangeOne = () => {
    setCheckedOne(!checkedOne);
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
                  fill: `${checkedOne ? '#FFC107' : '#B3B5B7'}`
                }
              })}
              value={checkedOne}
              onChange={handleChangeOne}
              style={{marginRight: '26px'}}
            />

            <Checkbox
              label={decorIcon("heart", {
                style: {
                  width: '18px',
                  height: '16px',
                  fill: `${checkedOne ? '#FC4D4D' : '#B3B5B7'}`
                }
              })}
              value={checkedOne}
              onChange={handleChangeOne}
              style={{marginRight: '26px'}}
            />

            <SearchForm />
          </div>

          <button className="header__logout-btn">{decorIcon("logOut")}</button>
        </div>
      </Container>
    </header>
  );
}
