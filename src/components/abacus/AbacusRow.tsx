import React, { useEffect, useRef, useState } from "react";
import { AbacusRowProps } from "./Abacus.types";
import { Button } from "../common/Button";

const TOTAL_ELEMENTS = 10;
// percent buffer from a bead width
const BEAD_BUFFER = 1.25;

const AbacusRow = ({ beadsColor, showNumber }: AbacusRowProps) => {
  const [showBeadsNumber, setShowBeadsNumber] = useState(showNumber);
  const containerRef = useRef<HTMLDivElement>(null);
  const beads = useRef<HTMLDivElement[]>([]);
  const prevTouch = useRef<TouchEvent>();
  const activeBeadId = useRef<number>();
  const containerWidth = useRef<number>(0);
  const beadWidth = useRef<number>(0);
  const [beadsNumber, setBeadsNumber] = useState([10, 0]);

  const mouseDown = (index: number) => {
    prevTouch.current = undefined;
    activeBeadId.current = index;
  };

  const mouseUp = () => {
    activeBeadId.current = undefined;
  };

  const getLeftStyleValue = (style: string) => parseFloat(style.split("px")[0]);

  const checkForReachEnd = (id: number) => {
    const elementLeft = beads.current.map(({ style: { left } }) =>
      getLeftStyleValue(left)
    );

    let index = id;
    let lastBallId = id;
    let shouldStop = true;

    while (index < TOTAL_ELEMENTS && shouldStop) {
      shouldStop = true;

      if (elementLeft[index + 1] - elementLeft[index] === beadWidth.current) {
        lastBallId = index + 1;
      } else {
        shouldStop = false;
      }

      index++;
    }

    return (
      elementLeft[lastBallId] + beadWidth.current >= containerWidth.current
    );
  };

  const checkForReachStart = (index: number) => {
    const elementLeft = beads.current.map(({ style: { left } }) =>
      getLeftStyleValue(left)
    );

    let i = index;
    let firstBallId = index;
    let shouldStop = true;

    while (i > 0 && shouldStop) {
      shouldStop = true;

      if (elementLeft[i] - elementLeft[i - 1] === beadWidth.current) {
        firstBallId = i - 1;
      } else {
        shouldStop = false;
      }

      i--;
    }

    return elementLeft[firstBallId] <= 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (prevTouch.current) {
      const movementX = Math.round(
        e.changedTouches[0].clientX -
          prevTouch.current?.changedTouches[0].clientX
      );
      handleMouseMove({ movementX });
    }
    prevTouch.current = e;
  };
  const handleMouseMove = ({ movementX }: any) => {
    if (activeBeadId.current !== undefined && movementX !== 0) {
      let updateValue = movementX;

      while (updateValue !== 0) {
        if (movementX > 0) {
          checkForRightCollisions(activeBeadId.current, 1);
          updateValue--;
        } else {
          checkForLeftCollisions(activeBeadId.current, -1);
          updateValue++;
        }
      }
      setBeadsNumber([getLeftBeads(), getRightBeads()]);
    }
  };

  const checkForRightCollisions = (id: number, movementX: number) => {
    const elementLeft = beads.current.map(({ style: { left } }) =>
      getLeftStyleValue(left)
    );
    const ballIdsToUpdate = [id];

    let index = id;
    let hasBallToRight = false;

    do {
      hasBallToRight = false;
      if (elementLeft[index + 1] - elementLeft[index] === beadWidth.current) {
        hasBallToRight = true;
        ballIdsToUpdate.push(index + 1);
      }
      index++;
    } while (index < TOTAL_ELEMENTS && hasBallToRight);

    if (checkForReachEnd(id)) return;
    updateBallByIds(ballIdsToUpdate, movementX);
  };

  const checkForLeftCollisions = (id: number, movementX: number) => {
    const elementLeft = beads.current.map(({ style: { left } }) =>
      getLeftStyleValue(left)
    );
    const ballIdsToUpdate = [id];

    let index = id;
    let hasBallToRight = false;

    do {
      hasBallToRight = false;
      if (elementLeft[index] - elementLeft[index - 1] === beadWidth.current) {
        hasBallToRight = true;
        ballIdsToUpdate.push(index - 1);
      }
      index--;
    } while (index > 0 && hasBallToRight);

    if (checkForReachStart(id)) return;
    updateBallByIds(ballIdsToUpdate, movementX);
  };

  const updateBallByIds = (ballIds: any[], movementX: number) => {
    ballIds.forEach((ballId) => {
      if (beads.current[ballId]?.style?.left) {
        const left =
          getLeftStyleValue(beads.current[ballId].style.left) + movementX;
        beads.current[ballId].style.left = `${left}px`;
      }
    });
  };

  const getLeftBeads = () => {
    const elementLeft = beads.current.map(({ style: { left } }) =>
      getLeftStyleValue(left)
    );

    let index = 0;
    let beadsOnLeft = elementLeft[0] === 0 ? 1 : 0;

    if (beadsOnLeft === 0) return beadsOnLeft;

    while (index < TOTAL_ELEMENTS) {
      if (
        elementLeft[index + 1] - elementLeft[index] <=
        beadWidth.current * BEAD_BUFFER
      ) {
        beadsOnLeft++;
        index++;
      } else {
        return beadsOnLeft;
      }
    }

    return beadsOnLeft;
  };

  const getRightBeads = () => {
    const elementLeft = beads.current.map(({ style: { left } }) =>
      getLeftStyleValue(left)
    );

    let index = TOTAL_ELEMENTS - 1;
    let beadsOnRight =
      elementLeft[index] === containerWidth.current - beadWidth.current ? 1 : 0;

    if (beadsOnRight === 0) return beadsOnRight;

    while (index > 0) {
      if (
        elementLeft[index] - elementLeft[index - 1] <=
        beadWidth.current * BEAD_BUFFER
      ) {
        beadsOnRight++;
        index--;
      } else {
        return beadsOnRight;
      }
    }

    return beadsOnRight;
  };

  const toggleShowBeadsNumbers = () => setShowBeadsNumber(!showBeadsNumber);

  useEffect(() => {
    // Effect for adding and removing the mouse handlers

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", mouseUp);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", mouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  });

  useEffect(() => {
    // Handle receive new props

    setShowBeadsNumber(showNumber);
  }, [showNumber]);

  useEffect(() => {
    // Get width of a bead

    if (beads.current[0]) {
      const elementWidth = beads.current[0].offsetWidth;
      beadWidth.current = elementWidth;
      beads.current.forEach(
        (ref, index) => (ref.style.left = `${index * elementWidth}px`)
      );
    }
  }, [beads.current]);

  useEffect(() => {
    // Use Resize Observer to get the container width
    // doc link: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver

    const observer = new ResizeObserver((entries) => {
      const container = entries[0].target as HTMLDivElement;
      containerWidth.current = container.offsetWidth;
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center w-full h-12">
      <Button size="xs" variant="outline" onClick={toggleShowBeadsNumbers}>
        {showBeadsNumber ? "Hide" : "Show"} Numbers
      </Button>

      <div
        className="flex items-center w-full relative mx-16"
        ref={containerRef}
      >
        {showBeadsNumber && (
          <p className="absolute left-0 px-3 -translate-x-full font-bold text-2xl">
            {beadsNumber[0]}
          </p>
        )}
        <div className="absolute w-full h-3 bg-black" />
        {[...Array(TOTAL_ELEMENTS).keys()].map((index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement) => {
              beads.current[index] = el;
            }}
            style={{
              left: `${beads.current[index]?.style?.left}px`,
            }}
            onMouseDown={() => mouseDown(index)}
            onTouchStart={() => mouseDown(index)}
            className={`w-8 md:w-10 lg:w-12 aspect-square rounded-full cursor-pointer ${
              beadsColor[index]
            } ${beadWidth ? "absolute top-1/2 -translate-y-1/2" : ""}`}
          />
        ))}
        {showBeadsNumber && (
          <p className="absolute right-0 translate-x-full px-3 font-bold text-2xl">
            {beadsNumber[1]}
          </p>
        )}
      </div>
    </div>
  );
};

export default AbacusRow;
