import { Button } from 'antd';
// COMPONENTS
import decorIcon from '../../UI/icons/decors';
import CheckBoxFavorite from '../../checkbox/CheckBoxFavorite';
import TitleFile from '../../TitleFile';
import DrawerFileInfo from '../../DrawerFileInfo';

const documentItems = (arr, handleFavoriteDocs) => {
  let dataSource = [];

  arr.map((element) =>
    dataSource.push({
      key: `${element.id}_${element.title || element.name}`,

      name: <TitleFile data={element} />,

      filterByName: element?.title || element.name,

      filterRecommended: element.recommended,

      recommendations: decorIcon("star", {
        style: {
          width: '18px',
          height: '18px',
          fill: `${element.recommended ? '#FFC107' : '#B3B5B7'}`
        }
      }),

      favorite: (
        <CheckBoxFavorite
          defaultValue={element.is_favourite}
          onClick={handleFavoriteDocs(element)}
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
              onClick={handleFavoriteDocs(element)}
            />
          }

          Recommended={decorIcon("star", {
            style: {
              width: '18px',
              height: '18px',
              fill: `${element.recommended ? '#FFC107' : '#B3B5B7'}`
            }
          })}
        />
      ),
    })
  );
  return dataSource;
};

export default documentItems;
