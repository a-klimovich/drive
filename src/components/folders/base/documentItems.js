import { Button } from 'antd';
import { BASE_URL } from 'api/url';
import decorIcon from 'components/Icons/decors';
import TitleFile from 'components/TitleFile';
import CheckBoxFavorite from 'components/Checkbox/CheckBoxFavorite';
import DrawerFileInfo from 'components/DrawerFileInfo';

const documentItems = (arr, handleFavorite) => {
  const dataSource = [];

  arr.map((element) => dataSource.push({
    key: `${element.id}_${element.title || element.name}`,
    name: <TitleFile data={element} />,
    filterByName: element.name,
    filterRecommended: element.recommended,
    recommendations: decorIcon('star', {
      style: {
        width: '18px',
        height: '18px',
        fill: `${element.recommended ? '#FFC107' : '#B3B5B7'}`,
      },
    }),
    favorite: (
      <CheckBoxFavorite
        defaultValue={element.is_favourite}
        onClick={handleFavorite(element, BASE_URL.DOCUMENTS)}
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
        AddToFavorite={(
          <CheckBoxFavorite
            defaultValue={element.is_favourite}
            onClick={handleFavorite(element, BASE_URL.DOCUMENTS)}
          />
          )}
        Recommended={decorIcon('star', {
          style: {
            width: '18px',
            height: '18px',
            fill: `${element.recommended ? '#FFC107' : '#B3B5B7'}`,
          },
        })}
      />
    ),
  }));
  return dataSource;
};

export default documentItems;
