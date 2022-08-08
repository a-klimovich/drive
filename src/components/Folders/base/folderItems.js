// COMPONENTS
import CheckBoxRecommend from "../../checkbox/CheckBoxRecommend";
import CheckBoxFavorite from "../../checkbox/CheckBoxFavorite";
import TitleFile from "../../TitleFile";

const folderItems = (arr) => {
  let dataSource = [];

  arr.map((element) => (dataSource.push({
    key: `${element.id}_${element.title}`,
    name: <TitleFile data={element} />,
    recommendations: <CheckBoxRecommend
      defaultValue={element.marked_by_admin}
    />,
    favorite: <CheckBoxFavorite
      defaultValue={element.is_favourite}
    />,
    date: element.updated_at || '-',
  })));

  return dataSource;
}

export default folderItems;