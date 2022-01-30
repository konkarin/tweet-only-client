import classNames from "classnames";
import { useContext } from "react";
import { UserContext } from "../context/user";
import styles from "../styles/IconList.module.scss";
interface Props {
  urls: string[];
}

export default function IconList({ urls }: Props) {
  const { currentUserIndex, setCurrentUserIndex } = useContext(UserContext);

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
