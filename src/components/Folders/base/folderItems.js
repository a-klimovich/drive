import React from 'react';
// COMPONENTS
import decorIcon from '../../UI/icons/decors';
import CheckBoxFavorite from "../../checkbox/CheckBoxFavorite";
import TitleFile from "../../TitleFile";


const folderItems = (arr, handleFavoriteFolder) => {
  let dataSource = [];

  arr.map((element) => (dataSource.push({
    key: `${element.id}_${element?.title || element.name}`,

    name: <TitleFile data={element} isFolderItem={true} />,

    filterByName: element?.title || element.name,

    recommendations: decorIcon("star", {
      style: {
        width: '18px',
        height: '18px',
        fill: `${element.recommended ? '#FFC107' : '#B3B5B7'}`
      }
    }),

    filterRecommended: element.recommended,
    
    favorite: <CheckBoxFavorite
      defaultValue={element.is_favourite}
      onClick={handleFavoriteFolder(element)}
    />,

    filterFavorite: element.is_favourite,
    
    date: element.updated_at || '-',
  })));

  return dataSource;
}

export default folderItems;