// FOLDERIconS
import {ReactComponent as EmptyFileIcon} from '../../../assets/image/files-icon/empty-file.svg';
import {ReactComponent as FileIcon} from '../../../assets/image/files-icon/file.svg';

const folderIcon = (isEmpty, props) => (isEmpty ? <EmptyFileIcon {...props} /> : <FileIcon {...props} />);

export default folderIcon;