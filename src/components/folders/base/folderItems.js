import React from 'react';
// COMPONENTS
import decorIcon from '../../UI/icons/decors';
import CheckBoxFavorite from '../../checkbox/CheckBoxFavorite';
import TitleFile from '../../TitleFile';
// URL
import { BASE_URL } from '../../../api/url';

const folderItems = (arr, handleFavorite) => {
  const dataSource = [];

  arr.map((element) => (dataSource.push({
    key: `${element.id}_${element?.title || element.name}`,

    name: <TitleFile data={element} isFolderItem />,

    filterByName: element?.title || element.name,

    recommendations: decorIcon('star', {
      style: {
        width: '18px',
        height: '18px',
        fill: `${element.recommended ? '#FFC107' : '#B3B5B7'}`,
      },
    }),

    filterRecommended: element.recommended,

    favorite: <CheckBoxFavorite
      defaultValue={element.is_favourite}
      onClick={handleFavorite(element, BASE_URL.FOLDERS)}
    />,

    filterFavorite: element.is_favourite,

    date: element.updated_at || '-',
  })));

  return dataSource;
};

export default folderItems;
