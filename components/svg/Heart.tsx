import { useState } from "react";

interface Props {
  active?: boolean;
  width?: number;
  height?: number;
}

export default function Heart({
  active = false,
  height = 24,
  width = 24,
}: Props) {
  const [pressed, setPressed] = useState(false);

  const color = active ? "#E81C4F" : "#AAB8C2";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 54 72"
      height={height}
      width={width}
      fill={color}
      style={{ opacity: pressed ? 0.5 : 1 }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
    >
      <path d="M38.723,12c-7.187,0-11.16,7.306-11.723,8.131C26.437,19.306,22.504,12,15.277,12C8.791,12,3.533,18.163,3.533,24.647 C3.533,39.964,21.891,55.907,27,56c5.109-0.093,23.467-16.036,23.467-31.353C50.467,18.163,45.209,12,38.723,12z" />
    </svg>
  );
}
