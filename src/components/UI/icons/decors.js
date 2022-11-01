import { ReactComponent as DownloadIcon } from '../../../assets/image/download.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/image/error.svg';
import { ReactComponent as EyesIcon } from '../../../assets/image/eyes.svg';
import { ReactComponent as FilterOptionsIcon } from '../../../assets/image/filter-options.svg';
import { ReactComponent as HeartIcon } from '../../../assets/image/heart.svg';
import { ReactComponent as LogOutIcon } from '../../../assets/image/log-out.svg';
import { ReactComponent as SearchIcon } from '../../../assets/image/search.svg';
import { ReactComponent as StarIcon } from '../../../assets/image/star.svg';
import { ReactComponent as UserIcon } from '../../../assets/image/user.svg';
import { ReactComponent as SadFace } from '../../../assets/image/sad-face.svg';

// eslint-disable-next-line consistent-return
const decorIcon = (fileType, props) => {
  switch (fileType) {
    case 'download':
      return <DownloadIcon {...props} />;

    case 'error':
      return <ErrorIcon {...props} />;

    case 'eyes':
      return <EyesIcon {...props} />;

    case 'filterOptions':
      return <FilterOptionsIcon {...props} />;

    case 'heart':
      return <HeartIcon {...props} />;

    case 'logOut':
      return <LogOutIcon {...props} />;

    case 'search':
      return <SearchIcon {...props} />;

    case 'star':
      return <StarIcon {...props} />;

    case 'sadFace':
      return <SadFace {...props} />;

    case 'user':
      return <UserIcon {...props} />;

    default:
      break;
  }
};

export default decorIcon;
