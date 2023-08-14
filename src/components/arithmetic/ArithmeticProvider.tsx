import { createContext, FC, useContext, useEffect, useMemo } from "react";
import { ContextAPI, OperationSign } from "./Arithmetic.types";
import { getAxisSteps, getNumberSteps } from "../../utils/arithmetic";
import useOptions from "./hooks/useOptions";
import useMathOptions from "./hooks/useMathOptions";
import useArithmeticAnimation from "./hooks/useArithmeticAnimation";

const Arithmetic = createContext<ContextAPI>({} as ContextAPI);

const ArithmeticProvider: FC<any> = ({ children, ...props }) => {
  const {
    options,
    totalSegments,
    handleOptionsUpdate,
    handleAxisNumberClick,
    updateLimits,
  } = useOptions();
  const { mathOptions, handleTermChange } = useMathOptions();
  const {
    arithmeticAnimation,
    handleAnimationEnd,
    handlePlayClick,
    handleNextClick,
    handlePreviousClick,
    handleStopClick,
  } = useArithmeticAnimation(
    mathOptions.operationSign,
    getNumberSteps(mathOptions.termTwo).length
  );

  const { startAt, endAt, jumpOrder } = options;
  const { termOne, termTwo, operationSign } = mathOptions;

  const steps = useMemo(
    () =>
      getAxisSteps(
        startAt,
        endAt,
        operationSign === OperationSign.ADD ? termOne : termOne - termTwo,
        termTwo,
        operationSign,
        jumpOrder
      ),
    [startAt, endAt, jumpOrder, mathOptions]
  );

  useEffect(() => {
    const result =
      mathOptions.operationSign === OperationSign.SUBTRACT
        ? mathOptions.termOne - mathOptions.termTwo
        : mathOptions.termOne + mathOptions.termTwo;
    const closerTenMultiple = Math.round(result / 10) * 10;

    if (result < options.startAt) {
      updateLimits(closerTenMultiple, options.endAt);
    } else if (result > options.endAt) {
      updateLimits(options.startAt, closerTenMultiple);
    }
  }, [mathOptions]);

  useEffect(() => {
    setTimeout(handleStopClick, 0);
  }, [mathOptions, options]);

  return (
    <Arithmetic.Provider
      {...props}
      value={{
        options,
        mathOptions,
        arithmeticAnimation,
        steps,
        totalSegments,
        handleTermChange,
        handleAxisNumberClick,
        handleOptionsUpdate,
        handleAnimationEnd,
        handlePlayClick,
        handleNextClick,
        handlePreviousClick,
        handleStopClick,
      }}
    >
      {children}
    </Arithmetic.Provider>
  );
};

export default ArithmeticProvider;

export const useArithmeticContext = () => useContext(Arithmetic);
