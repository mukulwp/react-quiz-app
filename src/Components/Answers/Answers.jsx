import React, { Fragment } from "react";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import "./Answers.css";

const Answers = ({ options = [], handleChange, input }) => {
  return (
    <div className="answers">
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <CheckboxInput
              className="answer"
              text={option.title}
              value={index}
              key={index}
              checked={option.checked}
              onChange={(e) => {
                handleChange(e, index);
              }}
            />
          ) : (
            <CheckboxInput
              className={`${"answer"} ${
                option.correct ? "correct" : option.checked ? "wrong" : null
              }`}
              text={option.title}
              key={index}
              defaultChecked={option.checked}
              disabled
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Answers;
