import axios from "axios";
import useSWR from "swr";
import type { User } from "firebase/auth";

import styles from "./Timeline.module.scss";
import Tweet from "../Tweet/Tweet";
import { ListData } from "../../pages/api/list";

type Props = {
  user: User;
};

export default function Timeline({ user }: Props) {
  const getList = async () => {
    const url = "/api/list";
    const params = {
      id_token: await user.getIdToken(),
    };

    const result = await axios.get<ListData>(url, { params }).catch(() => {
      return { data: null };
    });

    return result.data;
  };

  const { data, error } = useSWR("timeline", getList, {
    // refreshInterval: 60000,
    // DEBUG:
    refreshInterval: 6000000,
  });

  if (error) return <div className={styles.timeline}>Failed fetch</div>;
  if (data == null || data.result === undefined)
    return <div className={styles.timeline}>loading...</div>;

  const tweets = data.result;
  console.log(tweets);

  const filterdTweets = tweets.filter((tweet) => {
    return tweet.retweeted_status === undefined;
  });

  return (
    <ul className={styles.timeline}>
      {/* TODO: 無限スクロール */}
      {filterdTweets.map((tweet) => (
        <Tweet tweet={tweet} key={tweet.id} />
      ))}
    </ul>
  );
}
