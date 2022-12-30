import axios from "axios";
import { useState } from "react";
import classNames from "classnames";
import { User } from "firebase/auth";

import styles from "../styles/TweetForm.module.scss";
import Button from "./Button/Button";
import Photo from "./svg/Photo";
import IconList from "./IconList";
import { UserContextType } from "../context/user";

interface Props extends UserContextType {
  user: User;
}

// TODO: ユーザーデータをどっかで管理、Firestoreが無難だけどメンディー
const urls = [
  "https://pbs.twimg.com/profile_images/1548672763216687106/L79uf1MV_normal.jpg",
  "https://pbs.twimg.com/profile_images/1580568917830905857/Or0K4zLj_normal.jpg",
];

export default function TweetForm({
  user,
  currentUserIndex,
  setCurrentUserIndex,
}: Props) {
  const [inputValue, setInputValue] = useState("");

  const postTweet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue === "") return;

    // TODO: 画像の追加
    const url = "/api/post";
    const data = {
      idToken: await user.getIdToken(),
      status: inputValue,
      userIndex: currentUserIndex,
    };

    try {
      await axios.post(url, data);
      setInputValue("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const counterClass = classNames(styles.tweetForm__count, {
    [styles["tweetForm__count--over"]]: inputValue.length > 140,
  });

  return (
    <>
      <IconList
        urls={urls}
        currentUserIndex={currentUserIndex}
        setCurrentUserIndex={setCurrentUserIndex}
      />
      <form className={styles.tweetForm} onSubmit={postTweet}>
        <div className={styles.tweetForm__formWrapper}>
          <textarea
            value={inputValue}
            onChange={handleChange}
            className={styles.tweetForm__textarea}
            placeholder="What's the point of tweeting?"
          />
        </div>
        <div className={styles.tweetForm__controlWrapper}>
          <button className={styles.tweetForm__control}>
            <Photo />
          </button>
          <div className={styles.tweetForm__button}>
            <div className={counterClass}>{140 - inputValue.length}</div>
            <Button type="submit" disabled={inputValue.length === 0} thin>
              Tweet
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
