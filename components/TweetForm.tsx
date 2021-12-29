import { User } from "@firebase/auth";
import axios from "axios";
import { useState } from "react";
import styles from "../styles/TweetForm.module.scss";
import IconList from "./IconList";
import Button from "./Button/Button";
import classNames from "classnames";

interface Props {
  user: User;
}

export default function TweetForm({ user }: Props) {
  const [inputValue, setInputValue] = useState("");

  const post = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user || inputValue === "") return;

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
    <form onSubmit={post}>
      <div className={styles.tweetForm}>
        {/* textarea */}
        <div className={styles.tweetForm__formWrapper}>
          <textarea
            value={inputValue}
            onChange={handleChange}
            className={styles.tweetForm__textarea}
            placeholder="What's the point of tweeting?"
          />
          <div className={counterClass}>{140 - inputValue.length}</div>
        </div>
        {/* control */}
        <div className={styles.tweetForm__controlWrapper}>
          <div className={styles.tweetForm__control}></div>
          <div>
            <Button type="submit">Tweet</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
