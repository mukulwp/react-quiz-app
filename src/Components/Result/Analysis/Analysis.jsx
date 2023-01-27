import React from "react";
import "./Analysis.css";
import Question from "./Question/Question";

const Analysis = ({answers}) => {
  return (
    <div className="analysis">
      <h1>Question Analysis</h1>
      <Question answers={answers} />
    </div>
  );
};

export default Analysis;
