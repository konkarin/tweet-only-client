import { useContext } from "react";

import { UserContext } from "../../context/user";
import { loginTwitter } from "../../firebase/auth";
import styles from "./Auth.module.scss";
import TheHeader from "../TheHeader/TheHeader";
import Timeline from "../Timeline/Timeline";
import TweetForm from "../TweetForm";
import Button from "../Button/Button";

export default function Auth() {
  const context = useContext(UserContext);

  const login = async () => {
    await loginTwitter();
    // NOTE: Store token
  };

  if (context.user == null) {
    return (
      <div className={styles.unAuth}>
        <div className={styles.unAuth__button}>
          <Button onClick={login} type="button" outline>
            Log in
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <TheHeader />
        <TweetForm
          user={context.user}
          currentUserIndex={context.currentUserIndex}
          setCurrentUserIndex={context.setCurrentUserIndex}
        />
        <Timeline user={context.user} />
      </>
    );
  }
}
