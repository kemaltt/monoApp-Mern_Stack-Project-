import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiImageAdd, BiXCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/auth/auth-api";

const SignUp = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [registerMutation, { isLoading }] = useRegisterMutation();
  const [previewImg, setPreviewImg] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("userImg", file); // React Hook Form'un "setValue" fonksiyonu ile image state'i güncelleyebiliriz.

      // Create an image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("userImg", null);
    setPreviewImg(null);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.userImg) {
      formData.append("userImg", data.userImg, data.userImg.name);
    }

    const response = await registerMutation(formData);
    if (response.error) {
      setErrorMessage(response.error.data.message); // Display error message
    } else {
      setErrorMessage(<p className="text-success">Account created successfully</p>);
      setTimeout(() => {
        navigate("/login");
      }, 500);
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
        onSubmit={handleSubmit(onSubmit)} // RHF'nin handleSubmit fonksiyonunu buraya bağlıyoruz.
      >
        <div className="formContent">
          <label htmlFor="name">NAME</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
          />
          {errors.name && <span className="text-danger">{errors.name.message}</span>}

          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
          />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}

          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="Password"
          />
          {errors.password && <span className="text-danger">{errors.password.message}</span>}

          <label htmlFor="picture">PROFILE PICTURE</label>
          {previewImg ? (
            <div className="image-preview">
              <img src={previewImg} alt="Preview" />
              <BiXCircle className="remove-icon" size={24} onClick={removeImage} />
            </div>
          ) : (
            <label className="custom-file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <BiImageAdd size={24} /> Add Profile Photo
            </label>
          )}

          <button type="submit" disabled={isLoading}>
            Register
            {isLoading && (
              <span className="spinner-border spinner-border-sm mx-1" role="status"></span>
            )}
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
      </motion.form>
      <p>
        Already Have An Account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
