import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = (props) => {

    let navigate = useNavigate();
    const [uname, setUsername] = useState('');
    const [passwd, setPassword] = useState('');
    const [isValidCredentials, setIsValidCredentials] = useState(false);
    const [isFormValidated, setIsFormValidated] = useState(false);


    const NavigatetoPage = () => {
      if(isValidCredentials){
        return <Navigate to="/" />
      }
      else{
        return <Navigate to="/login" />
      }
    }

    const handleLogin = async (event) => {
      event.preventDefault();
        try {
          const response = await axios.post("http://localhost:8082/safar/user/login",
          { 
            username: uname,
            password: passwd
          });
          const { message, status } = response.data;
          setIsValidCredentials(status);
          alert(message);
          navigate("/booking");
          setTimeout(NavigatetoPage,2000);
        }
        catch (error) {
            console.error(error);
        }
      };

      const handleFormSubmit = (event) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
          setIsFormValidated(true);
        } else {
          setIsFormValidated(false);
        }
      };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
        <form className={`login-form ${isFormValidated ? "was-validated" : ""}`} onSubmit={handleFormSubmit}>
            <label htmlFor="username">Username: </label>
            <input
            value={uname}
            type="username"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(event) => {
                setUsername(event.target.value);
            }}
            required
            />
            <label htmlFor="password">Password: </label>
            <input
            value={passwd}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(event) => {
                setPassword(event.target.value);
            }}
            required
            />
            <button
            type="submit"
            className="login"
            onClick={handleLogin}>Login</button>
        </form>
        <button className="link" onClick={() => props.onFormSwitch('/register')}>Don't have an account? Register</button>
        </div>
    )
}