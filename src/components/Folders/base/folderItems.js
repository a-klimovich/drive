// COMPONENTS
import CheckBoxRecommend from "../../checkbox/CheckBoxRecommend";
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
    key: `${element.id}_${element.title}`,

    name: <TitleFile data={element} isFolderItem={true} />,

    recommendations: <CheckBoxRecommend
      defaultValue={element.recommended}
    />,

    favorite: <CheckBoxFavorite
      defaultValue={element.is_favourite}
      onClick={handleFavorite(element)}
    />,

    date: element.updated_at || '-',
  })));

  return dataSource;
}

export default folderItems;