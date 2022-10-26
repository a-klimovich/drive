import { Link } from 'react-router-dom';
// ANTD
import { Breadcrumb } from 'antd';

function BreadCrumbs(props) {
  const { folderPath } = props;

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

      {folderPath?.map((item) => (
        <Breadcrumb.Item key={`i${item?.title}`}>
          <Link to={`/${item?.id}`}>
            {
                            item?.title
                        }
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

export default BreadCrumbs;
