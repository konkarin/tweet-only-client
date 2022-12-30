import styles from "./Button.module.scss";
import classNames from "classnames";

interface Props {
  children?: string;
  type: "button" | "submit" | "reset" | undefined;
  outline?: boolean;
  onClick?: () => void | Promise<void>;
  thin?: boolean;
  disabled?: boolean;
}

export default function Button({
  type,
  children,
  onClick,
  outline,
  thin,
  disabled,
}: Props) {
  const buttonClass = classNames(styles.button, {
    [styles["button--outline"]]: outline,
    [styles["button--thin"]]: thin,
  });
  return (
    <button
      className={buttonClass}
      type={type}
      disabled={disabled}
      onClick={onClick || (() => {})}
    >
      {children}
    </button>
  );
}
