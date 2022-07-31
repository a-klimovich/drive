import { useState } from "react";
import decorIcon from '../UI/icons/decore';

const SearchForm = () => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // searct query!
  };

  const onChange = evt => setText(evt.target.value);

  return (
    <div className="search-box">
      <form className="search-box__form">
        <button
        className="btn-submit"
         onClick={onSubmit}
         type='button'>
          {decorIcon('search')}
        </button>

        <input
          type="text"
          placeholder="Поиск в моём кабинете"
          value={text}
          onChange={onChange}
        />
      </form>

      <button>
        {decorIcon('filterOptions')}
      </button>
    </div>
  );
};

export default SearchForm;