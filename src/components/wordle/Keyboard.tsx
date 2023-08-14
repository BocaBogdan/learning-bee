import { SVGAttributes } from "react";
import { KEYS } from "./Keyboard.constants";
import { getKeyClass } from "./Keyboard.utils";
import "./Keyboard.css";

interface KeyboardProps {
  usedKeys?: string[];
  wrongLocationKeys?: string[];
  correctKeys?: string[];
  onKeyPress?: (key: string) => void;
}

const BackspaceIcon = (props: SVGAttributes<SVGElement>) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth={1}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-10"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
    />
  </svg>
);

const Keyboard = ({
  usedKeys,
  wrongLocationKeys,
  correctKeys,
  onKeyPress,
}: KeyboardProps) => (
  <div className="grid gap-2 bg-gray-400 p-8 rounded-md w-full max-w-2xl mx-auto md:gap-3 lg:gap-4 | keyboard">
    {KEYS.map((key, index) =>
      key ? (
        <button
          className={getKeyClass(key, usedKeys, wrongLocationKeys, correctKeys)}
          key={index}
          onClick={() => onKeyPress?.(key)}
        >
          {key === "BACKSPACE" ? <BackspaceIcon /> : key}
        </button>
      ) : (
        <div key={index} />
      )
    )}
  </div>
);

export default Keyboard;
