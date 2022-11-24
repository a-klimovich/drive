import styles from './styles.module.scss';

function Title(props) {
  const { title } = props;

  return (
    <div
      className={styles.title}
    >
      <h2>{title}</h2>
    </div>
  );
}

export default Title;
