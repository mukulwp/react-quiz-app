import React from "react";
import "./SignupForm.css";

const SignupForm = ({ children, className, ...rest }) => {
  return (
    <>
      <form className={`${className} form`} {...rest}>
        {children}
      </form>
    </>
  );
};

export default SignupForm;
