import { Link } from 'react-router-dom';
// ANTD
import { Breadcrumb } from 'antd';

function BreadCrumbs(props) {
  const { folderPath, currentId } = props;

  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link
          to="/"
          separator="/"
        >
          Moй кабинет
        </Link>
      </Breadcrumb.Item>

      {
        currentId && (
          folderPath?.map((item) => (
            <Breadcrumb.Item key={`i${item?.title}`}>
              <Link to={`/${item?.id}`}>
                {
                  item?.title
                }
              </Link>
            </Breadcrumb.Item>
          ))
        )
      }
    </Breadcrumb>
  );
}

export default BreadCrumbs;
