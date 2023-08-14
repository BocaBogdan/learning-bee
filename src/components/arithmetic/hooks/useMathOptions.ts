import { useState } from "react";
import { MathTermsState, OperationSign } from "../Arithmetic.types";

const useMathOptions = () => {
  const [mathOptions, setMathOptions] = useState<MathTermsState>({
    termOne: 29,
    termTwo: 17,
    operationSign: OperationSign.SUBTRACT,
  });

  const handleTermChange = ({ target: { name, value } }: any) => {
    if (name === "operationSign") {
      setMathOptions({ ...mathOptions, [name]: value });
    } else {
      if (name === "termTwo" && parseInt(value) === 0) {
        setMathOptions({ ...mathOptions, [name]: 1 });
      } else {
        setMathOptions({ ...mathOptions, [name]: parseInt(value) });
      }
    }
  };

  return { mathOptions, handleTermChange };
};

export default useMathOptions;
