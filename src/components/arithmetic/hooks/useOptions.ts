import { useMemo, useState } from "react";
import { ArithmeticSettings, JumpOrder } from "../Arithmetic.types";

const defaultOptions: ArithmeticSettings = {
  startAt: 10,
  endAt: 35,
  interval: 1,
  jumpOrder: JumpOrder.LargestFirst,
  showAllNumbers: true,
  showTicks: true,
};

const useOptions = () => {
  const [options, setOptions] = useState<ArithmeticSettings>(defaultOptions);
  const { startAt, endAt, interval } = options;

  const totalSegments = useMemo(
    () => endAt - startAt + 1,
    [interval, startAt, endAt]
  );

  const handleAxisNumberClick = (index: number) =>
    setOptions({
      ...options,
      hiddenNumberIndex:
        options.hiddenNumberIndex === index ? undefined : index,
    });

  const handleOptionsUpdate = ({ target }: any) => {
    let name;
    let value;

    if (target.name) {
      name = target.name;
      value = target.value;
    } else {
      name = target.parentNode.name;
      value = target.parentNode.value;
    }

    if (name === "showAllNumbers") {
      setOptions({
        ...options,
        hiddenNumberIndex: undefined,
        [name]: value === "true",
      });
    } else if (name === "showTicks") {
      setOptions({ ...options, [name]: value === "true" });
    } else {
      setOptions({ ...options, [name]: parseInt(value) || 0 });
    }
  };

  const updateLimits = (start = startAt, end = endAt) =>
    setOptions({ ...options, startAt: start, endAt: end });

  return {
    options,
    totalSegments,
    handleAxisNumberClick,
    handleOptionsUpdate,
    updateLimits,
  };
};

export default useOptions;
