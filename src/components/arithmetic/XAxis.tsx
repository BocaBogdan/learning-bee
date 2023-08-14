import React from "react";
import XAxisSteps from "./XAxisSteps";
import XAxisSegments from "./XAxisSegments";

const XAxis = () => (
  <div className="w-full">
    <XAxisSteps />
    <hr className="border border-zinc-900" />
    <XAxisSegments />
  </div>
);

export default XAxis;
