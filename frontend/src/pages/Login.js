import "../scss/Login.scss";
import { Link, useNavigate } from "react-router-dom";
import Man from "../img/man.png";
import { motion } from "framer-motion";
import { useLoginMutation } from "../redux/auth/auth-api";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Login = ({ saveToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogIn = async (data) => {
    const response = await login(data); // data contains email and password from the form
    if (response.error) {
      setErrorMessage(response.error.data.message); // Display error message
    } else {
      saveToken(response.data.accessToken);
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <img src={Man} alt="the määään" />
      <motion.form
        onSubmit={handleSubmit(handleLogIn)} // Bind the form submit handler
        initial={{ y: "-8vh" }}
        animate={{ y: 10 }}
        transition={{
          delay: 0.4,
          type: "spring",
          stiffness: 200,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="formContent">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span>{errors.email.message}</span>
          )}

          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span >{errors.password.message}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm mx-1"
              role="status"
            ></span>
          )}
        </button>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
      </motion.form>

      <p className="mt-3">
        Have No Account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
