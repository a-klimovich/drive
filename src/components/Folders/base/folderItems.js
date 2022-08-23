// COMPONENTS
import decorIcon from '../../UI/icons/decors';
import CheckBoxFavorite from "../../checkbox/CheckBoxFavorite";
import TitleFile from "../../TitleFile";
// URL
import { BASE_URL } from '../../../utils/api/url';
// AXIOS
import request from '../../../utils/api/axios';

const folderItems = (arr) => {
  let dataSource = [];
  
  const handleFavorite = (val) => () => {
    request.patch(`${BASE_URL.FOLDERS}/${val?.id}`)
      .then(res => console.log(res))
      .catch((error) => {
        console.log(error.message);
      })
  }

  arr.map((element) => (dataSource.push({
    key: `${element.id}_${element?.title || element.name}`,

    name: <TitleFile data={element} isFolderItem={true} />,

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
    onClick={handleFavorite(element)}
    />,

    filterFavorite: element.is_favourite,
    
    date: element.updated_at || '-',
  })));

  return dataSource;
}

export default folderItems;