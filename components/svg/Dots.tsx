import { useState } from "react";

interface Props {
  active?: boolean;
  width?: number;
  height?: number;
}

export default function Dots({
  active = false,
  height = 24,
  width = 24,
}: Props) {
  const [pressed, setPressed] = useState(false);

  const color = active ? "#E81C4F" : "#AAB8C2";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill={color}
      style={{ opacity: pressed ? 0.5 : 1 }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}
