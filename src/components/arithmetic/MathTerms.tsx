import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import { OperationSign } from "./Arithmetic.types";
import { useArithmeticContext } from "./ArithmeticProvider";

const MathTerms = () => {
  const { mathOptions, handleTermChange } = useArithmeticContext();
  const { termOne, termTwo, operationSign } = mathOptions || {};

  return (
    <div className="flex gap-3 max-w-md mb-auto">
      <TextInput
        size="xl"
        type="number"
        name="termOne"
        value={termOne}
        onChange={handleTermChange}
      />
      <SelectInput
        size="xl"
        options={[
          { value: OperationSign.ADD, label: OperationSign.ADD },
          { value: OperationSign.SUBTRACT, label: OperationSign.SUBTRACT },
        ]}
        onChange={handleTermChange}
        name="operationSign"
        value={operationSign}
      />
      <TextInput
        size="xl"
        type="number"
        name="termTwo"
        value={termTwo}
        onChange={handleTermChange}
      />
    </div>
  );
};

export default MathTerms;
