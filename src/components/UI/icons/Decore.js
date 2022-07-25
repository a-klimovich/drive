import { ReactComponent as DownloadIcon } from '../../../assets/image/download.svg';
import { ReactComponent as ErrorIcon } from '../../../assets/image/error.svg';
import { ReactComponent as EyseIcon } from '../../../assets/image/eyse.svg';
import { ReactComponent as FilterOptionsIcon } from '../../../assets/image/filter-options.svg';
import { ReactComponent as HeartIcon } from '../../../assets/image/heart.svg';
import { ReactComponent as LogOutIcon } from '../../../assets/image/log-out.svg';
import { ReactComponent as SearchIcon } from '../../../assets/image/search.svg';
import { ReactComponent as StarIcon } from '../../../assets/image/star.svg';
import { ReactComponent as UserIcon } from '../../../assets/image/user.svg';


const decorIcon = (fileType) => {
  switch (fileType) {
    case 'download':
      return <DownloadIcon />

    case 'error':
      return <ErrorIcon />

    case 'eyse':
      return <EyseIcon />

    case 'filterOptions':
      return <FilterOptionsIcon />

    case 'heart':
      return <HeartIcon />

    case 'logOut':
      return <LogOutIcon />

    case 'search':
      return <SearchIcon />

    case 'star':
      return <StarIcon />

    case 'user':
      return <UserIcon />
      
    default:
      break;
  }
}

export default decorIcon;