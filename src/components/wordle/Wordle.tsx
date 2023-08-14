import "./Wordle.css";
import Keyboard from "./Keyboard";
import useWordle from "./wordleHook";
import { useMemo } from "react";

interface WordleProps {
  solution: string;
}

const Wordle = ({ solution }: WordleProps) => {
  const {
    handleKeyPress,
    handleReset,
    tiles,
    alert,
    usedKeys,
    wrongLocationKeys,
    correctKeys,
  } = useWordle(solution);

  const gridColsClass = useMemo(() => {
    const wordLength = solution.length;
    if (wordLength === 3) return "grid-cols-3";
    if (wordLength === 4) return "grid-cols-4";
    if (wordLength === 5) return "grid-cols-5";
  }, [solution]);

  return (
    <>
      <button onClick={handleReset}>reset</button>
      <div className="flex flex-col h-full relative">
        {alert && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40  bg-amber-200 px-8 py-2 mb-4 rounded-md shadow-lg">
            {alert}
          </div>
        )}

        <div
          className={`grid ${gridColsClass} grid-rows-6 gap-4 place-content-center mb-auto w-max mx-auto`}
        >
          {Array.from(Array(solution.length * 6).keys()).map((_, index) => (
            <div className="hexagon-wrapper" key={index}>
              <div
                className={`hexagon | grid place-content-center w-16 aspect-square text-2xl relative shadow-lg font-bold ${
                  tiles[index]?.className || "bg-gray-100"
                }`}
              >
                {tiles[index]?.letter?.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <Keyboard
          onKeyPress={handleKeyPress}
          usedKeys={usedKeys}
          wrongLocationKeys={wrongLocationKeys}
          correctKeys={correctKeys}
        />
      </div>
    </>
  );
};

export default Wordle;
