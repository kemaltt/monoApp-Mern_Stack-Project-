import "../scss/Login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Man from "../img/man.png";
import { apiBaseUrl } from "../api/api";
import { motion } from "framer-motion";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/users/login`, {
        email,
        password,
      });
      console.log(response);
      setToken(response.data.accessToken);
      navigate("/home");
    } catch (error) {
      console.log(error);
      if (error) {
        return setErrorMessage(error.response.data.message);
      }
    }
  };

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
