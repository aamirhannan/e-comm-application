import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { CartContext } from "../userContext";
import { CleaningServices, Email, Password } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const UserAddress = () => {
  const { user, setUser, userLogOut } = useContext(CartContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [error, setError] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    showErrorMessage: false,
  });

  const handleFormChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    setError({
      showErrorMessage: false,
      street: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const handleSubmit = () => {
    const isValid = validateUserData();
    console.log(isValid);
    if (isValid.isEmpty === true) {
      setUser({
        ...user,
        address: {
          street: userData.street,
          city: userData.city,
          state: userData.state,
          zipCode: userData.zipCode,
        },
      });

      setUserData({
        street: "",
        city: "",
        state: "",
        zipCode: "",
      });
      navigate("/");
    } else {
      setError({
        showErrorMessage: true,
        street: isValid.street,
        city: isValid.city,
        state: isValid.state,
        zipCode: isValid.zipCode,
      });
    }
  };

  const validateUserData = () => {
    const errors = {
      isEmpty: true,
    };
    if (!userData.street) {
      errors.street = "Street name required.";
      errors.isEmpty = false;
    }

    if (!userData.city) {
      errors.city = "City name is required.";
      errors.isEmpty = false;
    }

    if (!userData.state) {
      errors.state = "State name is required.";
      errors.isEmpty = false;
    }

    if (!userData.zipCode) {
      errors.zipCode = "Zipcode is required.";
      errors.isEmpty = false;
    }
    return errors;
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="login-outer-container">
      <div className="login-container">
        <div className="form-container">
          {/* <h1>Login</h1> */}
          <h1>Welcome to Flipkart</h1>

          <div className="address-container">
            <form className="form-inner-container">
              <div className="input-container">
                <input
                  name="street"
                  value={userData.name}
                  className="form-input-box"
                  type="text"
                  placeholder="Enter street name"
                  onChange={handleFormChange}
                />
                <p className="error-message">
                  {error.showErrorMessage && error.street}
                </p>
              </div>

              <div className="input-container">
                <input
                  className="form-input-box"
                  name="city"
                  value={userData.city}
                  type="text"
                  placeholder="Enter city name"
                  onChange={handleFormChange}
                />
                <p className="error-message">
                  {error.showErrorMessage && error.city}
                </p>
              </div>

              <div className="input-container">
                <input
                  name="state"
                  value={userData.password}
                  className="form-input-box"
                  type="text"
                  placeholder="Enter state name"
                  onChange={handleFormChange}
                />
                <p className="error-message">
                  {error.showErrorMessage && error.state}
                </p>
              </div>

              <div className="input-container">
                <input
                  name="zipCode"
                  value={userData.password}
                  className="form-input-box"
                  type="text"
                  placeholder="Enter zipCode"
                  onChange={handleFormChange}
                />
                <p className="error-message">
                  {error.showErrorMessage && error.zipCode}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
