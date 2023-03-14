import styles from './styles.module.scss';

const Title = (props) => {
  const { title } = props;

  return (
    <div
      className={styles.title}
    >
      <h2>{title}</h2>
    </div>
  );
};

export default Title;
