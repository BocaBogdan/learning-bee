import { Button } from "../common/Button";
import { FaEye, FaEyeSlash, FaTrashAlt } from "react-icons/fa";
import { TallyProps } from "./tally.hook";

const TallyControls = (props: Omit<TallyProps, "sticks">) => {
  const {
    deleteAll,
    incrementByFive,
    incrementByOne,
    decrementByFive,
    decrementByOne,
    visible,
    toggleVisible,
  } = props;

  const buttonClassName = "rounded-full aspect-square p-0";

  return (
    <div className="flex gap-4 justify-center pt-4">
      <Button
        className={buttonClassName}
        variant="outline"
        Icon={() => <FaTrashAlt className={"fill-black"} />}
        onClick={deleteAll}
      />
      <Button
        className={buttonClassName}
        variant="outline"
        onClick={decrementByFive}
      >
        -5
      </Button>
      <Button
        className={buttonClassName}
        variant="outline"
        onClick={decrementByOne}
      >
        -
      </Button>
      <Button
        className={buttonClassName}
        variant="outline"
        onClick={incrementByOne}
      >
        +
      </Button>
      <Button
        className={buttonClassName}
        variant="outline"
        onClick={incrementByFive}
      >
        +5
      </Button>
      <Button
        className={buttonClassName}
        variant="outline"
        Icon={() => (visible ? <FaEye /> : <FaEyeSlash />)}
        onClick={toggleVisible}
      />
    </div>
  );
};

export default TallyControls;
