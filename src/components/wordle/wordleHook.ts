import { useEffect, useState } from "react";
import {
  ANIMATION_DURATION,
  GameStatus,
  SPECIAL_KEY,
} from "./Wordle.constants";

interface TileProps {
  letter: string;
  className: string;
}

const letterRegex = new RegExp("[a-zA-Z]");
const useWordle = (solution: string) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAY);
  const [alert, setAlert] = useState("");
  const [userInput, setUserInput] = useState("");
  const [userSolution, setUserSolution] = useState("");
  const [userWordsTiles, setUserWordsTiles] = useState<TileProps[]>([]);

  const [usedKeys, setUsedKeys] = useState<string[]>([]);
  const [wrongLocationKeys, setWrongLocationKeys] = useState<string[]>([]);
  const [correctKeys, setCorrectKeys] = useState<string[]>([]);

  const handleKeyPress = (key: string) => {
    if (gameStatus !== GameStatus.PLAY) return;
    if (key.toUpperCase() === "ENTER") {
      handleSubmit();
    } else if (
      key.toUpperCase() === "BACKSPACE" ||
      key.toUpperCase() === "DELETE"
    ) {
      setUserInput(userInput.substring(0, userInput.length - 1));
    } else if (userInput.length < solution.length) {
      setUserInput(`${userInput}${key}`);
    }
  };

  const getKeysStatus = () => {
    const letters = userInput.split("");

    const usedKeysSet = new Set(usedKeys);
    const wrongLocationKeysSet = new Set(wrongLocationKeys);
    const correctKeysSet = new Set(correctKeys);

    for (let i = 0; i < letters.length; i++) {
      if (solution[i] === letters[i]) {
        correctKeysSet.add(letters[i]);
      } else if (solution.includes(letters[i])) {
        wrongLocationKeysSet.add(letters[i]);
      } else {
        usedKeysSet.add(letters[i]);
      }
    }

    setUsedKeys([...usedKeysSet]);
    setWrongLocationKeys([...wrongLocationKeysSet]);
    setCorrectKeys([...correctKeysSet]);
  };

  const handleSubmit = () => {
    if (userInput.length < solution.length) {
      setAlert("Too short");

      setTimeout(() => setAlert(""), 1000);
      return;
    }

    if (userInput === solution) setGameStatus(GameStatus.WIN);

    getKeysStatus();
    setUserSolution(userInput);
    setUserInput("");
  };
  const getTiles = () => {
    const userInputTiles: TileProps[] = userInput.split("").map((letter) => ({
      letter,
      className: "bg-gray-100",
    }));

    return [...userWordsTiles, ...userInputTiles];
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      (e.key.length === 1 && letterRegex.test(e.key)) ||
      SPECIAL_KEY.includes(e.key.toUpperCase())
    )
      handleKeyPress(e.key);
  };

  const handleReset = () => {
    setGameStatus(GameStatus.PLAY);
    setAlert("");
    setUserInput("");
    setUserSolution("");
    setUserWordsTiles([]);

    setUsedKeys([]);
    setWrongLocationKeys([]);
    setCorrectKeys([]);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [userInput, gameStatus]);

  useEffect(() => {
    const newWordTiles = userSolution.split("").map((letter, index) => ({
      letter,
      className: `bg-gray-100 hexagon--flip ${
        correctKeys.includes(letter) && solution[index] === letter
          ? "bg-lime-600"
          : wrongLocationKeys.includes(letter)
          ? "bg-yellow-400"
          : "bg-gray-400"
      }`,
    }));

    setUserWordsTiles([...userWordsTiles, ...newWordTiles]);
    setUserSolution("");

    setTimeout(() => {
      const afterAnimationTiles = userWordsTiles.map(
        ({ letter, className }) => ({
          letter,
          className: className?.replace("bg-gray-100 hexagon--flip", ""),
        })
      );

      if (gameStatus === GameStatus.WIN) {
        const totalTiles = afterAnimationTiles.length - 1;

        for (
          let index = totalTiles;
          index > totalTiles - solution.length;
          index--
        ) {
          afterAnimationTiles[
            index
          ].className = `${afterAnimationTiles[index].className} animate-bounce`;
        }
      }

      setUserWordsTiles(afterAnimationTiles);
    }, ANIMATION_DURATION);
  }, [userSolution]);

  useEffect(() => {
    if (gameStatus === GameStatus.WIN) {
      setAlert("Congrats!");

      setTimeout(() => setAlert(""), 5000);
    } else if (gameStatus === GameStatus.LOSE) {
      setAlert(solution);

      setTimeout(() => setAlert(""), 5000);
    }
  }, [gameStatus]);

  useEffect(() => {
    if (
      userWordsTiles.length === solution.length * 6 &&
      gameStatus !== GameStatus.WIN
    ) {
      setGameStatus(GameStatus.LOSE);
    }
  }, [userWordsTiles]);

  return {
    alert,
    handleKeyPress,
    handleReset,
    tiles: getTiles(),
    usedKeys,
    wrongLocationKeys,
    correctKeys,
  };
};

export default useWordle;
