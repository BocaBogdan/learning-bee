import {
  AnimationEventHandler,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";

export enum JumpOrder {
  LargestFirst,
  SmallestFirst,
}

export enum OperationSign {
  ADD = "+",
  SUBTRACT = "-",
}

export type IntervalType = 1 | 2 | 5 | 10;

export interface ArithmeticSettings {
  jumpOrder: JumpOrder;
  startAt: number;
  endAt: number;
  interval: IntervalType;
  showTicks: boolean;
  showAllNumbers: boolean;
  hiddenNumberIndex?: number;
}

export interface MathTermsState {
  termOne: number;
  termTwo: number;
  operationSign: OperationSign;
}

export interface ArithmeticAnimationState {
  isPlaying: boolean;
  isAnimationPlaying: boolean;
  step: number;
  animationDuration: number;
}

export interface Step {
  value: number;
  numberStep: number;
  gridStart: number;
  hasArc: boolean;
  start: boolean;
}

export interface ContextAPI {
  options: ArithmeticSettings;
  mathOptions: MathTermsState;
  arithmeticAnimation: ArithmeticAnimationState;
  steps: Step[];
  totalSegments: number;
  handleTermChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  handleAxisNumberClick: Function;
  handleOptionsUpdate: ChangeEventHandler<HTMLInputElement> &
    MouseEventHandler<HTMLButtonElement>;
  handleAnimationEnd: AnimationEventHandler<HTMLDivElement>;
  handlePlayClick: MouseEventHandler<HTMLButtonElement>;
  handleNextClick: MouseEventHandler<HTMLButtonElement>;
  handlePreviousClick: MouseEventHandler<HTMLButtonElement>;
  handleStopClick: MouseEventHandler<HTMLButtonElement>;
}
