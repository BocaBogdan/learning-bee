import React from "react";
import MediaButtons from "./MediaButtons";
import XAxis from "./XAxis";
import MathTerms from "./MathTerms";
import ArithmeticProvider from "./ArithmeticProvider";

const Arithmetic = () => (
  <ArithmeticProvider>
    <div className="border-2 rounded-lg w-2/3 h-2/3 flex flex-col items-center p-3 overflow-hidden">
      <MathTerms />
      <XAxis />
      <MediaButtons />
    </div>
  </ArithmeticProvider>
);

export default Arithmetic;
