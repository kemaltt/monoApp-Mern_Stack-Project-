import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../api/api";
import { BiImageAdd, BiXCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userImg, setUserImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserImg(file);

      // Create an image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUserImg(null);
    setPreviewImg(null);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (userImg) {
      formData.append("userImg", userImg, userImg.name);
    }

    setIsLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: `${apiBaseUrl}/users/register`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
        setMessage(<p className="text-success">Account created successfully</p>);
        setTimeout(() => {
          setName("");
          setEmail("");
          setPassword("");
          removeImage();
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setIsLoading(false);
      const errorMsg = error.response?.data?.err || error.response?.message || "An error occurred";
      setMessage(<p className="text-danger">{errorMsg}</p>);
    }
  };

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
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="picture">PROFILE PICTURE</label>
          {previewImg ? (
            <div className="image-preview">
              <img src={previewImg} alt="Preview" />
              <BiXCircle className="remove-icon" size={24} onClick={removeImage} />
            </div>
          ) : (
            <label className="custom-file-upload">
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <BiImageAdd size={24} /> Add Profile Photo
            </label>
          )}

          <button onClick={handleSignUp} disabled={isLoading}>
            Register
            {isLoading && (
              <span className="spinner-border spinner-border-sm mx-1" role="status"></span>
            )}
          </button>
        </div>
      </motion.form>
      <p>
        Already Have An Account? <Link to="/login">Log In</Link>
      </p>
      {message && <div>{message}</div>}
    </div>
  );
};

export default SignUp;
