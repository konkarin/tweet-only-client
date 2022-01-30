import { User } from "@firebase/auth";
import axios from "axios";
import { useState } from "react";
import styles from "../styles/TweetForm.module.scss";
import Button from "./Button/Button";
import classNames from "classnames";
import Photo from "./svg/Photo";
import IconList from "./IconList";

interface Props {
  user: User;
}

// DEBUG:
const urls = [
  "https://pbs.twimg.com/profile_images/1319312049957007363/GAY0jYhG_normal.jpg",
  "https://pbs.twimg.com/profile_images/1147809083669413888/1vo1ib0O_normal.png",
];

export default function TweetForm({ user }: Props) {
  const [inputValue, setInputValue] = useState("");

  const post = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || inputValue === "") return;
    // TODO: 画像の追加
    const url = "/api/post";
    const data = {
      idToken: await user.getIdToken(),
      status: inputValue,
    };

    const result = await axios.post(url, data).catch((e) => e);
    console.log(result);

    setInputValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const counterClass = classNames(styles.tweetForm__count, {
    [styles["tweetForm__count--over"]]: inputValue.length > 140,
  });

  return (
    <>
      <IconList urls={urls} />
      <form className={styles.tweetForm} onSubmit={post}>
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
