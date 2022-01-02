import { useState } from "react";

interface Props {
  width?: number;
  height?: number;
  active?: boolean;
}

export default function Retweet({
  height = 24,
  width = 24,
  active = false,
}: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 65 72"
      height={height}
      width={width}
      fill="#AAB8C2"
      style={{ opacity: pressed ? 0.5 : 1 }}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
    >
      <path d="M41 31h-9V19c0-1.14-.647-2.183-1.668-2.688-1.022-.507-2.243-.39-3.15.302l-21 16C5.438 33.18 5 34.064 5 35s.437 1.82 1.182 2.387l21 16c.533.405 1.174.613 1.82.613.453 0 .908-.103 1.33-.312C31.354 53.183 32 52.14 32 51V39h9c5.514 0 10 4.486 10 10 0 2.21 1.79 4 4 4s4-1.79 4-4c0-9.925-8.075-18-18-18z" />
    </svg>
  );
}
