import classNames from "classnames";
import { UserContextType } from "../context/user";
import styles from "../styles/IconList.module.scss";

interface Props {
  urls: string[];
  currentUserIndex: number;
  setCurrentUserIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function IconList({
  urls,
  currentUserIndex,
  setCurrentUserIndex,
}: Props) {
  const imgClass = (index: number) => {
    return classNames(styles.iconList__icon, {
      [styles["iconList__icon--active"]]: currentUserIndex === index,
    });
  };

  return (
    <ul className={styles.iconList}>
      {urls.map((item, index) => {
        return (
          <li key={item} className={styles.iconList__item}>
            <input
              type="radio"
              name="user"
              id={"user" + index.toString()}
              value={index}
              checked={currentUserIndex === index}
              onChange={() => setCurrentUserIndex(index)}
              className={styles.iconList__itemButton}
            />
            <label
              className={styles.iconList__itemLabel}
              htmlFor={"user" + index.toString()}
            >
              <img src={item} alt="item" className={imgClass(index)} />
            </label>
          </li>
        );
      })}
    </ul>
  );
}
