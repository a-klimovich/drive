// FILES TYPE
import {ReactComponent as DocIcon} from '../../../assets/image/files-icon/doc.svg';
import {ReactComponent as JpgIcon} from '../../../assets/image/files-icon/jpg.svg';
import {ReactComponent as MusikIcon} from '../../../assets/image/files-icon/musik.svg';
import {ReactComponent as ZipIcon} from '../../../assets/image/files-icon/zip.svg';
import {ReactComponent as XlsIcon} from '../../../assets/image/files-icon/XLS.svg';
import {ReactComponent as VideoIcon} from '../../../assets/image/files-icon/video.svg';
import {ReactComponent as TxtIcon} from '../../../assets/image/files-icon/txt.svg';
import {ReactComponent as RarIcon} from '../../../assets/image/files-icon/rar.svg';
import {ReactComponent as PointIcon} from '../../../assets/image/files-icon/point.svg';
import {ReactComponent as PdfIcon} from '../../../assets/image/files-icon/pdf.svg';

const fileTypeIcone = (fileType) => {
  switch (fileType) {
    case 'doc':
      return <DocIcon />

    case 'jpg':
      return <JpgIcon />

    case 'musik':
      return <MusikIcon />

    case 'zip':
      return <ZipIcon />

    case 'XLS':
      return <XlsIcon />

    case 'video':
      return <VideoIcon />

    case 'txt':
      return <TxtIcon />

    case 'rar':
      return <RarIcon />

    case 'point':
      return <PointIcon />

    case 'pdf':
      return <PdfIcon />

    default:
      break;
  }
}

export default fileTypeIcone;
