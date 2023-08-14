interface SoundProps {
  noiseLevel: number;
}

const Sound = ({ noiseLevel }: SoundProps) => (
  <div
    className={`flex relative h-full w-full min-w-[4rem] border-4 rounded-xl overflow-hidden ${
      noiseLevel > 33.33
        ? noiseLevel > 66.66
          ? "border-red-500"
          : "border-amber-500"
        : "border-gray-400"
    }`}
  >
    <span className="absolute h-1 top-1/3 left-0 right-0 bg-red-500" />

    <span
      className={`absolute h-1 top-2/3 left-0 right-0 ${
        noiseLevel > 66.66 ? "bg-red-500" : "bg-amber-500"
      }`}
    />

    <div
      className={`flex-1 self-end transition-height duration-300 ease-in-out ${
        noiseLevel > 33.33
          ? noiseLevel > 66.66
            ? "bg-red-500"
            : "bg-amber-500"
          : "bg-gray-400"
      }`}
      style={{ height: `${noiseLevel}%` }}
    />
  </div>
);

export default Sound;
