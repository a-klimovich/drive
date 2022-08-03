import { Space, Button } from "antd";
// COMPONENTS
import decorIcon from "../../components/UI/icons/decors";
import CheckBoxRecommend from "../../components/checkbox/CheckBoxRecommend";
import CheckBoxFavorite from "../../components/checkbox/CheckBoxFavorite";
import TitleFile from "../../components/TitleFile";

const formattingListElements = (arrOfElements) => {
  let newArr = [];

  arrOfElements.map((element) => (newArr.push({
    key: `${element.id + '_' + element.title}`,
    name: <TitleFile data={element} />,
    recommendations: <CheckBoxRecommend
      defaultValue={element.marked_by_admin}
    />,
    favorite: <CheckBoxFavorite
      defaultValue={element.is_favourite}
    />,
    date: element.updated_at || '-',
    control: <Space>
      <Button
        type="text"
        htmlType="button"
      >
        {decorIcon("eyes")}
      </Button>
  
      <Button
        type="text"
        htmlType="button"
      >
        {decorIcon("download")}
      </Button>
    </Space>,
  })));

  return newArr;
}

export default formattingListElements;