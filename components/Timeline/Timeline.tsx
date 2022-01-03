import { User } from "firebase/auth";
import axios from "axios";
import useSWR from "swr";
import styles from "./Timeline.module.scss";
import Heart from "../svg/Heart";
import Retweet from "../svg/Retweet";
import Reply from "../svg/Reply";
import Dots from "../svg/Dots";

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
  console.log(tweets);

  const filterdTweets = tweets.filter((item: any) => {
    return item.retweeted_status === undefined;
  });

  return (
    <ul className={styles.timeline}>
      {filterdTweets.map((item: any) => (
        <li className={styles.timeline__tweetContainer} key={item.id_str}>
          <div className={styles.timeline__iconWrapper}>
            <img
              className={styles.timeline__icon}
              src={item.user.profile_image_url_https}
              alt={item.user.name}
            />
          </div>
          <div className={styles.timeline__tweet}>
            <div className={styles.timeline__tweetText}>{item.text}</div>
            {/* TODO: 画像表示 */}
            <div className={styles.timeline__tweetControl}>
              <div className={styles.timeline__icon}>
                <Reply />
              </div>
              <div className={styles.timeline__icon}>
                <Heart />
                <span className={styles.timline__iconCount}>
                  {item.favorite_count}
                </span>
              </div>
              <div className={styles.timeline__icon}>
                <Retweet />
                <span className={styles.timline__iconCount}>
                  {item.retweet_count}
                </span>
              </div>
              <div className={styles.timeline__icon}>
                <Dots />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
