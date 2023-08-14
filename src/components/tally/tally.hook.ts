import { useState } from "react";

export interface TallyProps {
  sticks: number;
  deleteAll: () => void;
  incrementByFive: () => void;
  incrementByOne: () => void;
  decrementByFive: () => void;
  decrementByOne: () => void;
  visible: boolean;
  toggleVisible: () => void;
}

const useTally = () => {
  const [sticks, setSticks] = useState(0);
  const [visible, setVisible] = useState(false);

  const deleteAll = () => setSticks(0);

  const incrementByFive = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(incrementByOne, i * 250);
    }
  };
  const incrementByOne = () => setSticks((prevState) => prevState + 1);
  const decrementByFive = () =>
    setSticks((prevState) => {
      if (prevState - 5 < 0) return 0;
      return prevState - 5;
    });
  const decrementByOne = () =>
    setSticks((prevState) => {
      if (prevState - 1 < 0) return 0;
      return prevState - 1;
    });

  const toggleVisible = () => setVisible(!visible);

  return {
    sticks,
    deleteAll,
    incrementByFive,
    incrementByOne,
    decrementByFive,
    decrementByOne,
    visible,
    toggleVisible,
  };
};

export default useTally;
