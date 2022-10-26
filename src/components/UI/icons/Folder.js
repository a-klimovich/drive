// FOLDER Icons
import { ReactComponent as EmptyFileIcon } from '../../../assets/image/files-icon/empty-file.svg';
import { ReactComponent as FileIcon } from '../../../assets/image/files-icon/file.svg';
import styles from './Icone.module.scss';

const folderIcon = (isEmpty, props) => (isEmpty
  ? <EmptyFileIcon className={styles.folder} {...props} />
  : <FileIcon className={styles.folder} {...props} />);

export default folderIcon;
