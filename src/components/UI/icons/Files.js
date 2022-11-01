// CONST
import fileType from 'helpers/const/fileType';
// FILES TYPE
import { ReactComponent as DocIcon } from 'assets/image/files-icon/doc.svg';
import { ReactComponent as JpgIcon } from 'assets/image/files-icon/jpg.svg';
import { ReactComponent as MusicIcon } from 'assets/image/files-icon/musik.svg';
import { ReactComponent as ZipIcon } from 'assets/image/files-icon/zip.svg';
import { ReactComponent as XlsIcon } from 'assets/image/files-icon/XLS.svg';
import { ReactComponent as VideoIcon } from 'assets/image/files-icon/video.svg';
import { ReactComponent as TxtIcon } from 'assets/image/files-icon/txt.svg';
import { ReactComponent as RarIcon } from 'assets/image/files-icon/rar.svg';
import { ReactComponent as PointIcon } from 'assets/image/files-icon/point.svg';
import { ReactComponent as PdfIcon } from 'assets/image/files-icon/pdf.svg';

// eslint-disable-next-line consistent-return
const fileTypeIcon = (type, props) => {
  switch (type) {
    case fileType.DOC:
      return <DocIcon {...props} />;

    case fileType.IMG:
      return <JpgIcon {...props} />;

    case fileType.WAV:
      return <MusicIcon {...props} />;

    case fileType.ZIP:
      return <ZipIcon {...props} />;

    case fileType.XLS:
      return <XlsIcon {...props} />;

    case fileType.MP4:
      return <VideoIcon {...props} />;

    case fileType.PPT:
      return <PointIcon {...props} />;

    case fileType.PDF:
      return <PdfIcon {...props} />;

    case 'txt':
      return <TxtIcon {...props} />;

    case 'rar':
      return <RarIcon {...props} />;

    default:
      break;
  }
};

export default fileTypeIcon;
