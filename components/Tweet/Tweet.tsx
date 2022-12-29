import { TweetV1 } from "twitter-api-v2";
import { convertToRealtiveTime } from "../../utils/day";
import styles from "./Tweet.module.scss";

type Props = {
  tweet: TweetV1;
};

const convertTweetText = ({ entities, text }: TweetV1) => {
  const media = entities.media;
  const urls = entities.urls;
  // TODO: mention, hashtag

  if (media !== undefined) {
    return text.replace(media[0].url, "");
  } else if (urls !== undefined && urls.length > 0) {
    // remove https://t.co/...
    text = text.replace(urls[0].url, "");
    // TODO: multi url, url in text
    const expandedUrls = urls.map((item) => {
      return item.expanded_url;
    });

    return text;
  } else {
    return text;
  }
};

export default function Tweet({ tweet }: Props) {
  const media = tweet.extended_entities?.media;

  return (
    <li className={styles.timeline__item} key={tweet.id_str}>
      <div className={styles.userIcon}>
        <img
          className={styles.userIcon__img}
          src={tweet.user.profile_image_url_https}
          alt={tweet.user.name}
        />
      </div>
      <div className={styles.tweetContainer}>
        <div className={styles.tweetInfo}>
          <div className={styles.tweetInfo__time}>
            {convertToRealtiveTime(tweet.created_at)}
          </div>
          {/* NOTE: Comment out when add copy link */}
          {/* <div className={styles.tweetInfo__menu}>
            <Dots />
          </div> */}
        </div>
        <div className={styles.tweet}>
          {/* NOTE: Comment out when entities usage is fixed */}
          {/* <div className={styles.tweet__text}>{convertTweetText(tweet)}</div> */}
          <div className={styles.tweet__text}>{tweet.text}</div>

          {media === undefined ? undefined : (
            <div className={styles.tweet__mediaContainer}>
              {media.map((item) => (
                <img
                  src={item.media_url_https}
                  alt={item.ext_alt_text}
                  key={item.id}
                />
              ))}
            </div>
          )}
        </div>
        {/* TODO: OGP表示 */}
      </div>
    </li>
  );
}
