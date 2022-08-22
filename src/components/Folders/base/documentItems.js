import { Button } from 'antd';
// COMPONENTS
import decorIcon from '../../UI/icons/decors';
import CheckBoxRecommend from '../../checkbox/CheckBoxRecommend';
import CheckBoxFavorite from '../../checkbox/CheckBoxFavorite';
import TitleFile from '../../TitleFile';
import DrawerFileInfo from '../../DrawerFileInfo';
// URL
import { BASE_URL } from '../../../utils/api/url';
// AXIOS
import request from '../../../utils/api/axios';

const documentItems = (arr) => {
  let dataSource = [];

  const handleFavorite = (val) => () => {
    request
      .patch(`${BASE_URL.DOCUMENTS}/${val?.id}`, {
        is_favourite: true,
      })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error.message);
      });
  };

  arr.map((element) =>
    dataSource.push({
      key: `${element.id}_${element.title || element.name}`,

      name: <TitleFile data={element} />,

      filterRecommended: element.recommended,

      recommendations: <CheckBoxRecommend defaultValue={element.recommended} />,

      favorite: (
        <CheckBoxFavorite
          defaultValue={element.is_favourite}
          onClick={handleFavorite(element)}
        />
      ),

      filterFavorite: element.is_favourite,

      date: element.updated_at || '-',

      control: (
        <Button
          type="text"
          icon={decorIcon('download')}
          href={element?.file}
          download
        />
      ),

      info: (
        <DrawerFileInfo
          data={element}
          AddToFavorite={
            <CheckBoxFavorite
              defaultValue={element.is_favourite}
              onClick={handleFavorite(element)}
            />
          }

          Recommended={<CheckBoxRecommend
            defaultValue={element.recommended}
          />}
        />
      ),
    })
  );
  return dataSource;
};

export default documentItems;
