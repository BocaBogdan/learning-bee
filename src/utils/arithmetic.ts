import {
  JumpOrder,
  OperationSign,
  Step,
} from "../components/arithmetic/Arithmetic.types";

export const getNumberSteps = (termTwo: number, jumpOrder?: JumpOrder) => {
  if (termTwo === 0) return [];
  const arr: (1 | 10)[] = [];

  while (termTwo > 0) {
    if (termTwo - 10 >= 0) {
      arr.push(10);
      termTwo -= 10;
    } else {
      arr.push(1);
      termTwo -= 1;
    }
  }

  if (jumpOrder === JumpOrder.SmallestFirst) return arr.reverse();
  return arr;
};

export const getAxisSteps = (
  startAt: number,
  endAt: number,
  termOne: number,
  termTwo: number,
  operationSign: OperationSign,
  jumpOrder: JumpOrder
) => {
  let gridStart = 0;
  const numberSteps = getNumberSteps(termTwo, jumpOrder);
  const totalSteps = numberSteps.length;
  const numbers: Step[] = [];
  const isAddition = operationSign === OperationSign.ADD;

  if (!isAddition) numberSteps.reverse();

  if (termOne < startAt) termOne += startAt;

  while (startAt <= endAt) {
    if (startAt === termOne) {
      for (let step = 0; step < totalSteps; step++) {
        let hasArc = true;
        let start = false;
        let numberStep = totalSteps;
        const value = numberSteps[step];

        if (step === 0) {
          numberStep = isAddition ? step : totalSteps - step - 1;
          start = isAddition;
        } else if (step === numberSteps.length - 1) {
          numberStep = isAddition ? step : totalSteps - step - 1;
          start = !isAddition;
        } else {
          numberStep = isAddition ? step : totalSteps - step - 1;
        }

        numbers.push({
          value,
          numberStep,
          gridStart,
          hasArc,
          start,
        });

        gridStart += value;
      }
      startAt += termTwo;
    } else {
      startAt += 1;
      gridStart += 1;
      numbers.push({ value: 0 } as Step);
    }
  }

  return numbers;
};
