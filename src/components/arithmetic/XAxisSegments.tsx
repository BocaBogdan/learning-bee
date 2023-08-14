import React from "react";
import { useArithmeticContext } from "./ArithmeticProvider";

const XAxisSegments = () => {
  const { options, totalSegments, handleAxisNumberClick } =
    useArithmeticContext();
  const {
    startAt,
    endAt,
    interval,
    hiddenNumberIndex,
    showAllNumbers,
    showTicks,
  } = options || {};

  const xAxisNumbers: number[] = Array.from(
    { length: Math.ceil((endAt - startAt) / interval) + 1 },
    (_, i) => i * interval + startAt
  );

  return (
    <div
      className="grid relative"
      style={{
        gridTemplateColumns: `repeat(${totalSegments}, minmax(0, 1fr))`,
      }}
    >
      {xAxisNumbers.map((number, index) => (
        <div
          className="relative flex flex-col mb-1"
          style={{
            gridColumn:
              interval !== 1
                ? `${index * interval + 1}/${(index + 1) * interval}`
                : "initial",
          }}
          key={number}
        >
          {showTicks && (
            <p
              className={`${
                number <= 40 && number % 5 === 0 ? "w-4" : "w-3"
              } rotate-90 -translate-x-1/2 h-px -mt-0.5 border border-zinc-900`}
            />
          )}
          {(number <= 20 ||
            (number <= 40 && number % 5 === 0) ||
            (number <= 100 && number % 10 === 0)) && (
            <p
              className={`mt-2 cursor-pointer border -translate-x-1/2 ${
                index === hiddenNumberIndex
                  ? "border-red-600 text-white w-full h-full"
                  : "border-transparent w-min"
              }`}
              onClick={() => handleAxisNumberClick(index)}
            >
              {index !== hiddenNumberIndex && number}
            </p>
          )}
        </div>
      ))}
      {!showAllNumbers && (
        <div className="absolute inset-0 mt-2 border bg-white border border-red-600 w-full" />
      )}
    </div>
  );
};

export default XAxisSegments;
