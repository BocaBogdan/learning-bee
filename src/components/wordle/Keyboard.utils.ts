import { SPECIAL_KEY } from "./Wordle.constants";

const keyClass =
  "grid place-content-center h-14 uppercase rounded shadow md:h-20";
const shortKeyClass = `${keyClass} col-span-2`;
const longKeyClass = `${keyClass} col-span-3 text-xs md:text-base`;

const defaultKeyClass = "bg-white hover:bg-gray-200";
const usedKeyClass = "bg-gray-800 hover:bg-gray-900 text-white";
const wrongLocationKeyClass = "bg-yellow-400 hover:bg-yellow-500 text-white";
const correctKeyClass = "bg-lime-600 hover:bg-lime-700 text-white";

export const getKeyClass = (
  key: string,
  usedKeys?: string[],
  wrongLocationKeys?: string[],
  correctKeys?: string[]
) => {
  const baseKeyClass = SPECIAL_KEY.includes(key) ? longKeyClass : shortKeyClass;

  if (usedKeys?.includes(key)) return `${baseKeyClass} ${usedKeyClass}`;
  if (wrongLocationKeys?.includes(key))
    return `${baseKeyClass} ${wrongLocationKeyClass}`;
  if (correctKeys?.includes(key)) return `${baseKeyClass} ${correctKeyClass}`;

  return `${baseKeyClass} ${defaultKeyClass}`;
};
