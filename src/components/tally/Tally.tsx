import useTally from "./tally.hook";
import Sticks from "./Sticks";
import TallyControls from "./Controls";

const Tally = () => {
  const props = useTally();
  const { visible, sticks } = props;

  return (
    <div className="h-full border rounded p-4 flex flex-col">
      <div className="h-full overflow-auto relative">
        {visible && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-8xl py-4 px-8 border bg-white shadow-lg rounded z-50">
            {sticks}
          </div>
        )}
        <Sticks totalSticks={sticks} />
      </div>
      <TallyControls {...props} />
    </div>
  );
};

export default Tally;
