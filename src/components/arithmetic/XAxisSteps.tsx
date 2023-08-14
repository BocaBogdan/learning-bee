import React, { useMemo } from "react";
import { useArithmeticContext } from "./ArithmeticProvider";
import { OperationSign } from "./Arithmetic.types";
import "./Arithmetic.css";

const XAxisSteps = () => {
  const {
    steps,
    mathOptions,
    arithmeticAnimation,
    totalSegments,
    handleAnimationEnd,
  } = useArithmeticContext();
  const { operationSign } = mathOptions || {};
  const { step, isPlaying, animationDuration } = arithmeticAnimation || {};

  const isAddition = useMemo(
    () => operationSign === OperationSign.ADD,
    [operationSign]
  );

  const arcColorClassName = isAddition ? "border-blue-600" : "border-red-600";
  const arcClassName = `w-full h-[200%] border border-dashed rounded-[100%] ${arcColorClassName}`;

  const dotClassName =
    "absolute top-full w-6 aspect-square rounded-full border-2 -translate-x-1/2 -translate-y-1/2 z-10";

  const bgClassName = isAddition ? "bg-blue-100" : "bg-red-100";
  const dotColorClassName = `${arcColorClassName} ${bgClassName}`;
  const leftClassName = isAddition ? "left-0" : "left-full";

  const startDotClassName = `${dotClassName} ${leftClassName} bg-zinc-200 border-zinc-900 z-20`;
  const endDotClassName = `${dotClassName} ${leftClassName} ${dotColorClassName}`;

  const templateColumnsStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${totalSegments}, minmax(0, 1fr))`,
      "--duration": `${animationDuration}ms`,
    }),
    [totalSegments, animationDuration]
  );

  const gridColumnStyle = (index: number, value: number, gridStart: number) => {
    if (gridStart) {
      const start = gridStart + 1;
      const end = start + value;
      return { gridColumn: `${start}/${end}` };
    }
  };

  return (
    <div className="grid h-12" style={templateColumnsStyle}>
      {steps.map(
        ({ value, hasArc, start, numberStep, gridStart }, index: number) => (
          <div
            key={index}
            className="relative"
            style={gridColumnStyle(index, value, gridStart)}
          >
            <div className={`h-full relative overflow-hidden`}>
              {hasArc && numberStep < step && <div className={arcClassName} />}
              {hasArc && numberStep < step && (
                <div
                  className={`${
                    step - 1 === numberStep ? "hide-background" : ""
                  } ${
                    operationSign === OperationSign.SUBTRACT
                      ? "hide-background--reverse"
                      : ""
                  }
                  ${!isPlaying ? "hide-background--pause" : ""}`}
                />
              )}
            </div>
            {start && <div className={startDotClassName} />}
            {step - 1 === numberStep && (
              <div
                onAnimationEnd={handleAnimationEnd}
                className={`${endDotClassName} | animate ${
                  step - 1 === numberStep
                    ? isAddition
                      ? "animate-reverse"
                      : ""
                    : ""
                } ${!isPlaying ? "animate-pause" : ""}`}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};

export default XAxisSteps;
