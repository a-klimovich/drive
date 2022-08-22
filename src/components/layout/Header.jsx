import React, {useContext} from "react";
// COMPONENTS
import Container from "../Container";
import decorIcon from "../UI/icons/decors";
import Title from "../UI/Title";
import SearchForm from "../form/SearchForm";
import CheckBoxRecommend from "../checkbox/CheckBoxRecommend";
import CheckBoxFavorite from "../checkbox/CheckBoxFavorite";
// CONTEXT
import Context from "../../utils/context/Context";

export default function Header(props) {
  const { state } = useContext(Context);
  const { base } = state;

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
            <Title>{`Здравствуйте! ${base?.user?.name}`}</Title>
          </div>

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

          <button className="header__logout-btn">{decorIcon("logOut")}</button>
        </div>
      </Container>
    </header>
  );
}
