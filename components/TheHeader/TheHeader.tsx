import styles from "./TheHeader.module.scss";
import Settings from "../svg/Settings";
import React, { useState } from "react";
import Logout from "../svg/Logout";

export default function TheHeader() {
  const [showSettings, setShowSettings] = useState(false);

  const closePopup = (e: MouseEvent) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.closest("#popupSettings") == null) {
        setShowSettings(false);
        document.removeEventListener("click", closePopup);
      }
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
  return (
    <header className={styles.header}>
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
                <span className={styles.settingsPopup__linkText}>Log out</span>
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
