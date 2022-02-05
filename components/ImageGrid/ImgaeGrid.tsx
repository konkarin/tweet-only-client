import styles from "./ImageGrid.module.scss";

interface Props {
  media: string[];
}

export default function ImageGrid({ media }: Props) {
  const gridNum = media.length;

  return (
    <div className={styles.imageGrid}>
      <div className={styles.imageGrid__item}>
        <img className={styles.imageGrid__img} src={media[0]} alt={media[0]} />
      </div>
    </div>
  );
}
