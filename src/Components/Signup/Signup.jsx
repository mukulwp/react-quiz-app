import React, { useState } from "react";
import Illustration from "./Illustration";
import SignupForm from "./SignupForm";
import "./Signup.css";
import TextInput from "../TextInput/TextInput";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import Button from "../Button/Button";
import { Link, useNavigate } from "react-router-dom";
import img from "../../images/signup.svg";
import { useAuth } from "../../Context/AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCPasswordError] = useState("");
  const [agreeError, setAgreeError] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [conPasswordVisibility, setConPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();



  async function handleSubmit(e) {
    e.preventDefault();

    //validation

    !username ? setUsernameError("Name is required!") : setUsernameError("");
    email === "" ? setEmailError("Email is required!") : setEmailError("");

    if (!password) {
      setPasswordError("Password is required!");
    } else if (password.length < 6) {
      setPasswordError("Password must be minimum six characters!");
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setCPasswordError("Confirm password is required!");
    } else if (password !== confirmPassword) {
      setCPasswordError("Password didn't match!");
    } else {
      setCPasswordError("");
    }

    if (!agree) {
      setAgreeError("Please agree to our terms & conditions!");
    } else {
      setAgreeError("");
    }

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !agree ||
      password.length < 6 ||
      password !== confirmPassword
    ) {
      return false;
    }
    setIsLoading(true);
    
    try {
      await signup(email, password, username);
      navigate("/");
      setIsLoading(false);
      setError("");
    } catch (err) {
      setError("Failed to sign up!");
      err.code === "auth/email-already-in-use"
        ? setEmailError("Email already in use!")
        : setEmailError("");
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration img={img} altText="signup" />
        <SignupForm onSubmit={handleSubmit} className="signup">
          <TextInput
            type="text"
            placeholder="Enter Your Name"
            icon="person"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <p className="input-error">{usernameError}</p>
          <TextInput
            type="email"
            placeholder="Enter Your Email"
            icon="alternate_email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="input-error">{emailError}</p>
          <div className="password">
            <TextInput
              type={passwordVisibility ? "text" : "password"}
              placeholder="Enter Password"
              icon="lock"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span
              title={passwordVisibility ? "Hide Password" : "Show Password"}
              className="material-icons-outlined p-show-hide"
              onClick={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
            >
              {passwordVisibility ? "visibility_off" : "visibility"}
            </span>
          </div>
          <p className="input-error">{passwordError}</p>
          <div className="password">
            <TextInput
              type={conPasswordVisibility ? "text" : "password"}
              className="c-password"
              placeholder="Confirm Password"
              icon="lock_clock"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <span
              title={conPasswordVisibility ? "Hide Password" : "Show Password"}
              className="material-icons-outlined cp-show-hide"
              onClick={() => {
                setConPasswordVisibility(!conPasswordVisibility);
              }}
            >
              {conPasswordVisibility ? "visibility_off" : "visibility"}
            </span>
          </div>
          <p className="input-error">{cPasswordError}</p>
          <CheckboxInput
            text=" I agree to the Terms & Conditions"
            value={agree}
            onClick={() => {
              setAgree(!agree);
            }}
          />
          <p className="input-error">{agreeError}</p>
          <Button
            disabled={isLoading}
            type="submit"
            text={isLoading ? "Loading..." : "Submit now"}
            className="button"
          />
          {error && <p className="error">{error}</p>}
          <div className="info">
            Already have an account? <Link to="/login">Login</Link> instead.
          </div>
        </SignupForm>
      </div>
    </>
  );
};

export default Signup;
