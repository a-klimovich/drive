// CONST
import fileType from '../../../utils/const/fileType';
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

const fileTypeIcone = (type) => {
  switch (type) {
    case fileType.DOC:
      return <DocIcon />

    case fileType.IMG:
      return <JpgIcon />

    case fileType.WAV:
      return <MusikIcon />

    case fileType.ZIP:
      return <ZipIcon />

    case fileType.XLS:
      return <XlsIcon />

    case fileType.MP4:
      return <VideoIcon />

    case fileType.PPT:
      return <PointIcon />

    case fileType.PDF:
      return <PdfIcon />

    case 'txt':
      return <TxtIcon />

    case 'rar':
      return <RarIcon />

    default:
      break;
  }
}

export default fileTypeIcone;
