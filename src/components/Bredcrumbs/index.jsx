import { Link, useNavigate } from 'react-router-dom';

import { Breadcrumb, Button } from 'antd';
import styels from './styles.module.scss';

function BreadCrumbs(props) {
  const { folderPath, currentId } = props;
  const navigate = useNavigate();

  return (
    <div className={styels.bredcrumbsWrapper}>
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

      <Button
        type="primary"
        htmlType="button"
        onClick={() => navigate(-1)}
      >
        Назад
      </Button>
    </div>
  );
}

export default BreadCrumbs;
