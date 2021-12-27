import styles from "../styles/IconList.module.scss";

interface Props {
  urls: string[];
}

export default function IconList({ urls }: Props) {
  return (
    <ul className={styles.iconList}>
      {urls.map((item, index) => {
        return (
          <li key={item} className={styles.iconList__Wrapper}>
            <input
              type="radio"
              name="user"
              id={index.toString()}
              value={index}
            />
            <label htmlFor={index.toString()}>
              <img src={item} alt="item" className={styles.iconList__item} />
            </label>
          </li>
        );
      })}
    </ul>
  );
}
