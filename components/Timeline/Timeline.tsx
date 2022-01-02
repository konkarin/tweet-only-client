import { User } from "firebase/auth";
import axios from "axios";
import useSWR from "swr";
import styles from "./Timeline.module.scss";
import Heart from "../svg/Heart";
import Retweet from "../svg/Retweet";
import Reply from "../svg/Reply";

interface Props {
  user: User;
}

export default function Timeline({ user }: Props) {
  const getList = async () => {
    const url = "/api/list";
    const data = {
      idToken: await user.getIdToken(),
    };

    const result = await axios.post(url, data).catch((e) => e);
    return result;
  };

  const { data, error } = useSWR("/api/list", getList);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const tweets = data.data.result;

  return (
    <ul className={styles.timeline}>
      {tweets.map((item: any) => (
        <li className={styles.timeline__tweetContainer} key={item.id_str}>
          <div className={styles.timeline__iconWrapper}>
            <img
              className={styles.timeline__icon}
              src="https://pbs.twimg.com/profile_images/1319312049957007363/GAY0jYhG_normal.jpg"
              alt=""
            />
          </div>
          <div className={styles.timeline__tweet}>
            <div className={styles.timeline__tweetText}>{item.text}</div>
            <div className={styles.timeline__tweetControl}>
              <div>
                <Reply />
              </div>
              <div>
                <Heart />
              </div>
              <div>
                <Retweet />
              </div>
              <div>
                <Heart />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
