import styles from "./Button.module.scss";
import classNames from "classnames";

interface Props {
  children?: string;
  type: "button" | "submit" | "reset" | undefined;
  outline?: boolean;
  onClick?: () => void | Promise<void>;
  thin?: boolean;
}

export default function Button({
  type,
  children,
  onClick,
  outline,
  thin,
}: Props) {
  const buttonClass = classNames(styles.button, {
    [styles["button--outline"]]: outline,
    [styles["button--thin"]]: thin,
  });

  if (onClick == null) {
    return (
      <button className={buttonClass} type={type}>
        {children}
      </button>
    );
  } else {
    return (
      <button className={buttonClass} type={type} onClick={onClick}>
        {children}
      </button>
    );
  }
}
