import { User } from "@firebase/auth";
import axios from "axios";
import { useState } from "react";
import styles from "../styles/TweetForm.module.scss";
import IconList from "./IconList";

interface Props {
  user: User;
}

export default function TweetForm({ user }: Props) {
  const [inputValue, setInputValue] = useState("");

  const post = async () => {
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

  const urls = [
    "https://pbs.twimg.com/profile_images/1319312049957007363/GAY0jYhG_normal.jpg",
    "https://pbs.twimg.com/profile_images/1147809083669413888/1vo1ib0O_normal.png",
  ];

  return (
    <form onSubmit={() => post()}>
      <div className={styles.tweetForm}>
        {/* user icons */}
        <div className={styles.tweetForm__iconList}>
          <IconList urls={urls} />
        </div>
        {/* textarea */}
        <div className={styles.tweetForm__formWrapper}>
          <textarea
            value={inputValue}
            onChange={handleChange}
            className={styles.tweetForm__textarea}
            placeholder="What's the point of tweeting?"
          />
        </div>
        {/* control */}
        <div className={styles.tweetForm__controlWrapper}>
          <div className={styles.tweetForm__control}></div>
          <div>
            <button className={styles.tweetForm__tweet} type="submit">
              Tweet
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
