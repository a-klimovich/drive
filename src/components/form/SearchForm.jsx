import { useState } from "react";
import decorIcon from '../UI/icons/decors';
import Popover from '../Popover';
import FilterPopoverForm from './FilterPopoverForm';

const SearchForm = () => {
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = evt => setText(evt.target.value);

  return (
    <div className="search-box">
      <form className="search-box__form">
        <button
          className="btn-submit"
          onClick={onSubmit}
          type='button'
        >
          {decorIcon('search')}
        </button>

        <input
          type="text"
          placeholder="Поиск в моём кабинете"
          value={text}
          onChange={onChange}
        />
      </form>

      <Popover
        content={FilterPopoverForm}
      >
        <button>
          {decorIcon('filterOptions')}
        </button>
      </Popover>
    </div>
  );
};

export default SearchForm;