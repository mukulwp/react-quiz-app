import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Illustration from '../Signup/Illustration';
import TextInput from '../TextInput/TextInput';
import LoginForm from './LoginForm';
import img from '../../images/login.svg';
import './Login.css';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    !email ? setEmailError("Email is required!") : setEmailError("");
    !password ? setPasswordError("Password is required!") : setPasswordError("");

    if (!email || !password) {
      return false;
    }
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/");
      setIsLoading(false);
      setError("");
    } catch (err) {
      setError("Failed to login!");
      err.code === "auth/user-not-found" ? setEmailError("There is no account in this email!") : setEmailError("");
      err.code === "auth/wrong-password" ? setPasswordError("You entered wrong password!") : setPasswordError("");
      setIsLoading(false);
    }
  }

  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustration img={img} altText="login" />
        <LoginForm onSubmit={handleSubmit} style={{ height: "430px" }}>
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
          <div className="login-password">
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
              className="material-icons-outlined login-p-show-hide"
              onClick={() => {
                setPasswordVisibility(!passwordVisibility);
              }}
            >
              {passwordVisibility ? "visibility_off" : "visibility"}
            </span>
          </div>
          <p className="input-error">{passwordError}</p>
          <Button
            disabled={isLoading}
            type="submit"
            text={isLoading ? "Loading..." : "Login"}
            className="button"
          />
          {error && <p className="error">{error}</p>}
          <div className="info">
            Don't have an account? <Link to="/signup">Signup</Link> instead.
          </div>
        </LoginForm>
      </div>
    </>
  );
}

export default Login