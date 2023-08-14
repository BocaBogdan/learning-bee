import React, {
  KeyboardEventHandler,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaBars,
  FaPause,
  FaPlay,
  FaStepBackward,
  FaStepForward,
  FaStop,
} from "react-icons/fa";
import { Button } from "../common/Button";
import ArithmeticSettingsCard from "./ArithmeticSettingsCard";
import { useArithmeticContext } from "./ArithmeticProvider";

const MediaButtons = () => {
  const {
    arithmeticAnimation,
    handlePlayClick,
    handleNextClick,
    handlePreviousClick,
    handleStopClick,
  } = useArithmeticContext();
  const [showOptionsCard, setShowOptionsCard] = useState(false);
  const ref = useRef<HTMLDivElement>();

  const { isPlaying } = arithmeticAnimation || {};

  const buttonStyleClass = "rounded-full aspect-square p-0";
  const fillIconClass = "fill-black";

  const toggleOptionsView = () => setShowOptionsCard(!showOptionsCard);
  const closeOptionsView = () => setShowOptionsCard(false);
  const handleCloseOptions: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.code.toLowerCase() === "escape") {
      closeOptionsView();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        closeOptionsView();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      className="flex justify-center items-center gap-3"
      onKeyDown={handleCloseOptions}
    >
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          Icon={() => <FaBars className={fillIconClass} />}
          className={buttonStyleClass}
          onClick={toggleOptionsView}
        />
        {showOptionsCard && (
          <ArithmeticSettingsCard ref={ref as Ref<HTMLDivElement>} />
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        Icon={() => <FaStepBackward className={fillIconClass} />}
        className={buttonStyleClass}
        onClick={handlePreviousClick}
      />
      <Button
        variant="outline"
        size="xl"
        Icon={() =>
          isPlaying ? (
            <FaPause size={"1.5rem"} className={fillIconClass} />
          ) : (
            <FaPlay size={"1.5rem"} className={fillIconClass} />
          )
        }
        className={buttonStyleClass}
        onClick={handlePlayClick}
      />
      <Button
        variant="outline"
        size="sm"
        Icon={() => <FaStepForward className={fillIconClass} />}
        className={buttonStyleClass}
        onClick={handleNextClick}
      />
      <Button
        variant="outline"
        size="sm"
        Icon={() => <FaStop className={fillIconClass} />}
        className={buttonStyleClass}
        onClick={handleStopClick}
      />
    </div>
  );
};

export default MediaButtons;
