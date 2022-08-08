import { Button } from "antd";
// COMPONENTS
import decorIcon from "../../UI/icons/decors";
import CheckBoxRecommend from "../../checkbox/CheckBoxRecommend";
import CheckBoxFavorite from "../../checkbox/CheckBoxFavorite";
import TitleFile from "../../TitleFile";

const documentItems = (arr) => {
  let dataSource = [];

  arr.map((element) => (dataSource.push({
    key: `${element.id}_${element.title}`,

    name: <TitleFile data={element} />,

    recommendations: <CheckBoxRecommend
      defaultValue={element.recommended}
    />,

    favorite: <CheckBoxFavorite
      defaultValue={element.is_favourite}
    />,

    date: element.updated_at || '-',

    control: <Button
      type="text"
      icon={decorIcon("download")}
      href={element?.file}
      download
    />,
  })));
  return dataSource;
}

export default documentItems;