import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../api/api";
import { BiImageAdd } from "react-icons/bi";
import { motion } from "framer-motion";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userImg, setUserImg] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (userImg) {
      formData.append("userImg", userImg, userImg.name);
    }

    try {
      const response = await axios({
        method: "post",
        url: `${apiBaseUrl}/users/register`,
        data: formData,
        headers: {
          "Content-Type": `multipart/form-data; `,
        },
      });

      console.log(response);
      setSuccess("account created successfuly");
      setErrorMessage("");
      setTimeout(() => {
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);

      if (error.response.data.err) {
        return setErrorMessage(error.response.data.err);
      }
    }
  }

  return (
    <div className="signUp">
      <h1>Sign Up</h1>
      <motion.form
        initial={{ y: "-10vh" }}
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
          <label htmlFor="name">NAME</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            min="5"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <label htmlFor="picture">PROFILE PICTURE</label>
          <label className="custom-file-upload">
            <input
              type="file"
              onChange={(e) => setUserImg(e.target.files[0])}
            />
            <BiImageAdd size={24} /> Add Profile Foto
          </label>

          <button onClick={handleSignUp}>Sign Up</button>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </motion.form>
      <p>
        Already Have An Account? <Link to="/login">Log In</Link>{" "}
      </p>
    </div>
  );
};

export default SignUp;
