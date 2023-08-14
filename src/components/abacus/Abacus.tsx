import AbacusRow from "./AbacusRow";
import { AbacusProps } from "./Abacus.types";

const Abacus = ({ rowsNumber, rowsProps, showAllNumbers }: AbacusProps) => (
  <div className="flex flex-col gap-3 w-11/12 border  py-5 rounded-lg">
    {[...Array(rowsNumber).keys()].map((index) => (
      <AbacusRow
        key={index}
        {...rowsProps[index]}
        showNumber={showAllNumbers}
      />
    ))}
  </div>
);

export default Abacus;
