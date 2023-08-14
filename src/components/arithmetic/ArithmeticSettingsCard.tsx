import React, { forwardRef } from "react";
import { Button } from "../common/Button";
import TextInput from "../common/TextInput";
import { JumpOrder } from "./Arithmetic.types";
import { useArithmeticContext } from "./ArithmeticProvider";

const ArithmeticSettingsCard = forwardRef<HTMLDivElement>((_, ref) => {
  const { options, handleOptionsUpdate } = useArithmeticContext();
  const { showAllNumbers, jumpOrder, startAt, endAt, interval, showTicks } =
    options || {};

  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 border-2 rounded-lg grid gap-2 p-4 bg-white z-50 shadow-md mb-2"
      ref={ref}
    >
      <p className="text-xl">Arithmetic Settings</p>
      <div className="flex justify-between">
        <p className="flex-1">Jump order</p>
        <div className="flex flex-col flex-1 gap-1">
          <Button
            variant={
              jumpOrder === JumpOrder.LargestFirst ? "subtle" : "outline"
            }
            size="xs"
            value={JumpOrder.LargestFirst}
            name="jumpOrder"
            onClick={handleOptionsUpdate}
          >
            Largest place value first
          </Button>
          <Button
            variant={
              jumpOrder === JumpOrder.SmallestFirst ? "subtle" : "outline"
            }
            size="xs"
            value={JumpOrder.SmallestFirst}
            name="jumpOrder"
            onClick={handleOptionsUpdate}
          >
            Smallest place value first
          </Button>
        </div>
      </div>

      <p className="text-xl">Number line setup</p>
      <div className="flex justify-between">
        <p className="flex-1">Start at </p>
        <TextInput
          value={startAt}
          name={"startAt"}
          className="flex-1"
          size="xs"
          type="number"
          onChange={handleOptionsUpdate}
        />
      </div>
      <div className="flex justify-between">
        <p className="flex-1">End at </p>
        <TextInput
          value={endAt}
          name="endAt"
          className="flex-1"
          size="xs"
          type="number"
          onChange={handleOptionsUpdate}
        />
      </div>
      <div className="flex justify-between">
        <p className="flex-1">Interval</p>
        <div className="flex gap-2">
          {[1, 2, 5, 10].map((option) => (
            <Button
              key={option}
              variant={interval === option ? "subtle" : "outline"}
              size="xs"
              value={option}
              name="interval"
              onClick={handleOptionsUpdate}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <p className="flex-1">Show ticks</p>
        <input
          type="checkbox"
          value={(!showTicks).toString()}
          checked={showTicks}
          name="showTicks"
          onChange={handleOptionsUpdate}
        />
      </div>
      <div className="flex justify-between gap-2">
        <Button
          variant={showAllNumbers ? "subtle" : "outline"}
          size="xs"
          name="showAllNumbers"
          onClick={handleOptionsUpdate}
          value={"true"}
        >
          Show all numbers {showAllNumbers ? "true" : "false"}
        </Button>
        <Button
          variant={showAllNumbers ? "outline" : "subtle"}
          size="xs"
          name="showAllNumbers"
          onClick={handleOptionsUpdate}
          value={"false"}
        >
          Hide all numbers {showAllNumbers ? "true" : "false"}
        </Button>
      </div>

      {/*  Bottom triangle */}
      <div className="absolute bottom-0 left-1/2 translate-y-full -translate-x-1/2 w-6 overflow-hidden inline-block">
        <div className="h-4 w-4 bg-white border-2 -rotate-45 transform origin-top-left"></div>
      </div>
    </div>
  );
});

export default ArithmeticSettingsCard;
