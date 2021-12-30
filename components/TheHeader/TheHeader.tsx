import styles from "./TheHeader.module.scss";
import IconList from "../IconList";
import Settings from "../svg/Settings";
import React, { useState } from "react";
import { User } from "firebase/auth";
import Logout from "../svg/Logout";

interface Props {
  user: User | null;
}

const urls = [
  "https://pbs.twimg.com/profile_images/1319312049957007363/GAY0jYhG_normal.jpg",
  "https://pbs.twimg.com/profile_images/1147809083669413888/1vo1ib0O_normal.png",
];

export default function TheHeader({ user }: Props) {
  const [showSettings, setShowSettings] = useState(false);
  const isAuth = user !== null;

  const closePopup = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target != null && target.closest("#popupSettings") == null) {
      setShowSettings(false);
      document.removeEventListener("click", closePopup);
    }
  };

  const openSettings = (e: React.MouseEvent) => {
    if (showSettings) {
      setShowSettings(false);
    } else {
      setShowSettings(true);

      if (process.browser) {
        document.addEventListener("click", closePopup);
        e.stopPropagation();
      }
    }
  };

  if (!isAuth) {
    return <></>;
  } else {
    return (
      <header className={styles.header}>
        <IconList urls={urls} user={user} />
        <div id="popupSettings" className={styles.header__settings}>
          <button
            onClick={openSettings}
            className={styles.header__settingsButton}
          >
            <Settings color="#fff" height={32} width={32} />
          </button>
          {showSettings ? (
            <ul className={styles.settingsPopup}>
              <li className={styles.settingsPopup__item}>
                <button className={styles.settingsPopup__link}>
                  <span className={styles.settingsPopup__linkIcon}>
                    <Logout color="#fff" />
                  </span>
                  <span className={styles.settingsPopup__linkText}>
                    Log out
                  </span>
                </button>
              </li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </header>
    );
  }
}
