import "../scss/Login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Man from "../img/man.png";
import { apiBaseUrl } from "../api/api";
import { motion } from "framer-motion";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleLogIn(e) {
    e.preventDefault();

    fetch(`${apiBaseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message) {
          return setErrorMessage(result.message);
        }

        // console.log(result.accessToken);
        setToken(result.accessToken);
        navigate("/home");
      });
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <img src={Man} alt="the määään" />
      <motion.form
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
            name="email"
            id="email"
            placeholder="Email"
            min="5"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            min="8"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogIn}>Login</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </motion.form>

      <p>
        Have No Account? <Link to="/signup">Sign Up</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
