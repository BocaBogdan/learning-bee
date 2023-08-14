import "./stick.css";

const Rack = ({ sticks }: { sticks: number[] }) => (
  <div className="flex gap-4 w-min relative">
    {sticks.map((stick, index) => (
      <div
        className={`w-1 rounded-full overflow-hidden ${
          (index + 1) % 5 === 0
            ? "rotate-[245deg] absolute left-1/2 h-28"
            : "h-24"
        }`}
        key={index}
      >
        <div className="bg-black | draw" />
      </div>
    ))}
  </div>
);

const Sticks = ({ totalSticks }: { totalSticks: number }) => {
  const totalRacks = Array.from(
    { length: Math.ceil(totalSticks / 5) },
    (_, i) =>
      i + 1 === Math.ceil(totalSticks / 5)
        ? totalSticks % 5 === 0
          ? 5
          : totalSticks % 5
        : 5
  );

  return (
    <div className="flex flex-wrap gap-12 mx-6">
      {totalRacks.map((rack, index) => (
        <Rack sticks={[...Array(rack).keys()]} key={index} />
      ))}
    </div>
  );
};

export default Sticks;
