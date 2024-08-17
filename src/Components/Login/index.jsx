import React, { useContext, useState } from "react";
import "./login.css";
import { CartContext } from "../userContext";
import { CleaningServices, Email, Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, userLogOut } = useContext(CartContext);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    setError({
      showErrorMessage: false,
      name: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = () => {
    const isValid = validateUserData();
    console.log("30", isValid);
    if (isValid.isEmpty === true) {
      setUser({
        ...user,
        isLoggedIn: true,
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      setUserData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      setError({
        showErrorMessage: true,
        name: isValid.name,
        email: isValid.email,
        password: isValid.password,
      });
    }
  };

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    showErrorMessage: false,
  });

  const validateUserData = () => {
    const errors = {
      isEmpty: true,
    };
    if (!userData.name || userData.name.trim().length < 3) {
      errors.name = "Minimum 3 characters required.";
      errors.isEmpty = false;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!userData.email || !emailRegex.test(userData.email)) {
      errors.email = "Enter valid email address.";
      errors.isEmpty = false;
    }

    if (!userData.password || userData.password.length < 8) {
      errors.password = "Minimum 8 characters required.";
      errors.isEmpty = false;
    }

    return errors;
  };

  return (
    <div className="login-outer-container">
      <div className="login-container">
        <div className="form-container">
          {/* <h1>Login</h1> */}
          <h1>Welcome to Flipkart</h1>

          {user.isLoggedIn ? (
            <>
              <h1 className="user-alredy-loggedin">
                Already! LoggedIn as {user.name}
              </h1>

              <button
                className="logout-btn"
                onClick={(e) => {
                  e.preventDefault();
                  userLogOut();
                }}
              >
                Logout
              </button>

              <button
                style={{ marginTop: "10px" }}
                className="logout-btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Continue Shopping
              </button>
            </>
          ) : (
            <>
              <p>Login to your account</p>
              <form className="form-inner-container">
                <div className="input-container">
                  <input
                    name="name"
                    value={userData.name}
                    className="form-input-box"
                    type="text"
                    placeholder="Enter your name"
                    onChange={handleFormChange}
                  />
                  <p className="error-message">
                    {error.showErrorMessage && error.name}
                  </p>
                </div>

                <div className="input-container">
                  <input
                    className="form-input-box"
                    name="email"
                    value={userData.email}
                    type="text"
                    placeholder="Email"
                    onChange={handleFormChange}
                  />
                  <p className="error-message">
                    {error.showErrorMessage && error.email}
                  </p>
                </div>

                <div className="input-container">
                  <input
                    name="password"
                    value={userData.password}
                    className="form-input-box"
                    type="password"
                    placeholder="Password"
                    onChange={handleFormChange}
                  />
                  <p className="error-message">
                    {error.showErrorMessage && error.password}
                  </p>
                </div>
              </form>
              <div className="submit-cntr">
                <button
                  className="submit-btn"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(userData);
                    handleSubmit();
                  }}
                >
                  Login
                </button>
              </div>
              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>
              <div className="signup">
                <span>Don't have an account?</span>
                <a href="#">Sign Up</a>
              </div>

              <div className="signup note">
                Note - use any random email and password
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
