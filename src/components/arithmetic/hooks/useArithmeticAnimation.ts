import { useState } from "react";
import { ArithmeticAnimationState, OperationSign } from "../Arithmetic.types";

const ANIMATION_DURATION = 1500;
const useArithmeticAnimation = (
  operationSign: OperationSign,
  totalSteps: number
) => {
  const [arithmeticAnimation, setArithmeticAnimation] =
    useState<ArithmeticAnimationState>({
      animationDuration: ANIMATION_DURATION,
      isPlaying: false,
      isAnimationPlaying: false,
    } as ArithmeticAnimationState);

  const { isPlaying, isAnimationPlaying, step, animationDuration } =
    arithmeticAnimation;

  const handleAnimationEnd = () => {
    const nextStep = (step || 0) + 1;
    if (nextStep <= totalSteps && animationDuration !== 0) {
      setArithmeticAnimation({
        ...arithmeticAnimation,
        step: (step || 0) + 1,
      });
    }

    if (nextStep === totalSteps + 1) {
      setArithmeticAnimation({
        ...arithmeticAnimation,
        isPlaying: false,
        isAnimationPlaying: false,
      });
    }
  };

  const handlePlayClick = () => {
    if (step === totalSteps && !isAnimationPlaying) return;

    if (step !== undefined) {
      setArithmeticAnimation({
        ...arithmeticAnimation,
        isPlaying: !isPlaying,
        step: !isAnimationPlaying ? step + 1 : step,
        isAnimationPlaying: true,
        animationDuration: ANIMATION_DURATION,
      });
    } else {
      setArithmeticAnimation({
        ...arithmeticAnimation,
        isPlaying: !isPlaying,
        isAnimationPlaying: true,
        step: 1,
        animationDuration: ANIMATION_DURATION,
      });
    }
  };

  const handleNextClick = () => {
    const nextStep =
      step !== undefined
        ? step + 1 > totalSteps
          ? totalSteps
          : isAnimationPlaying
          ? step
          : step + 1
        : 1;

    setArithmeticAnimation({
      ...arithmeticAnimation,
      isPlaying: false,
      isAnimationPlaying: false,
      step: nextStep,
      animationDuration: 0,
    });
  };

  const handlePreviousClick = () => {
    if (totalSteps) {
      const nextStep =
        step !== undefined
          ? step - 1 < 0
            ? 0
            : isAnimationPlaying
            ? step
            : step - 1
          : 0;

      setArithmeticAnimation({
        ...arithmeticAnimation,
        isPlaying: false,
        isAnimationPlaying: false,
        step: nextStep,
        animationDuration: 0,
      });
    }
  };

  const handleStopClick = () =>
    setArithmeticAnimation({
      isPlaying: false,
      isAnimationPlaying: false,
      animationDuration: ANIMATION_DURATION,
    } as ArithmeticAnimationState);

  return {
    arithmeticAnimation,
    handlePlayClick,
    handleNextClick,
    handlePreviousClick,
    handleStopClick,
    handleAnimationEnd,
  };
};

export default useArithmeticAnimation;
