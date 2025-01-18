import React, { useEffect, useState, useRef } from "react";
import "../scss/EditProfile.scss";
import EditIcon from "../img/Vector.png";
import RemoveIcon from "../img/Vector.png";
import Nav from "../components/Nav";
import { motion } from "framer-motion";
import TopMobileBar from "../components/TopMobileBar";
import { useSelector } from "react-redux";
import { useGetTransactionsMutation } from "../redux/transaction/transaction-api";
import Loading from "../components/Loading";
import { apiBaseUrl } from "../api/api";
import { useUpdateUserMutation } from "../redux/auth/auth-api";
import UserIcon from "../img/userProfile.png";
import EmailIcon from "../img/envelope.png"



const EditProfile = () => {
  const [getTransactions, { isLoading: loadingTransactions }] = useGetTransactionsMutation();
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const { transactions } = useSelector((state) => state.transactions);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userImg, setUserImg] = useState("");
  const [editMode, setEditMode] = useState({ name: false, email: false })
  const [showEditIcons, setShowEditIcons] = useState({ name: false, email: false });
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllTransactions = async () => {
      await getTransactions();
    };
    getAllTransactions();
  }, [getTransactions]);

  useEffect(() => {
    if (transactions) {
      setName(transactions.name);
      setEmail(transactions.email);
      setUserImg(transactions.userImg);
    }
  }, [transactions]);


  const handleImageChange = (e) => {
    setUserImg(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setUserImg(null);
  };
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (userImg) {
      if (typeof userImg === 'string') {
        // Eski resim URL'ini gönderme
        formData.append('userImg', userImg);

      } else {
        formData.append('userImg', userImg);
      }
    }
    try {
      await updateUser(formData).unwrap();
    } catch (error) {
      console.error("Error update user", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="editProfile">
        <TopMobileBar />
        <div className="topBlueContainer">
          <h4>Edit Profile</h4>
        </div>
        <motion.div
          className="whiteContainer"
          initial={{ y: "-8vh" }}
          animate={{ y: 10 }}
          transition={{
            delay: 0.5,
            duration: 0.3,
            stiffness: 200,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            initial={{ y: "100vh" }}
            animate={{
              opacity: [0, 0.5, 1],
              y: [100, 0, 0],
            }}
            transition={{
              type: "twin",
              duration: 0.5,
              delay: 2 / 10,
            }}
          >
            <div className="image-container">
              <img
                src={
                  userImg && typeof userImg !== 'string' ? URL.createObjectURL(userImg) :
                    userImg?.startsWith("http")
                      ? userImg
                      : userImg ? `${apiBaseUrl}/${userImg}` : null
                }
                alt={name}
                className="profilePicture"
              />
                <img
                  src={EditIcon}
                  alt="Edit Icon"
                  className="edit-image-icon"
                  onClick={openFileInput}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                {userImg && (
                  <img
                    src={RemoveIcon}
                    alt="Remove Icon"
                    className="remove-image-icon"
                    onClick={handleRemoveImage}
                  />)}
              </div>
          </motion.div>

          {(loadingTransactions || loadingUpdate) ? <Loading />
            : <div className="userInformation">

              <motion.div
                className="user_item"
                initial={{ y: "100vh" }}
                animate={{
                  opacity: [0, 0.5, 1],
                  y: [100, 0, 0],
                }}
                transition={{
                  type: "twin",
                  duration: 0.5,
                }}
              >
                <div className="user_headline">
                  <img src={UserIcon} alt="User Icon" className="edit-profile-icon" />

                  {!editMode.name ? (<h5 onMouseEnter={() => setShowEditIcons({ ...showEditIcons, name: true })} onMouseLeave={() => setShowEditIcons({ ...showEditIcons, name: false })}>
                    {name}
                    {showEditIcons.name && (<img src={EditIcon} alt="Edit Icon" className="edit-icon" onClick={() => setEditMode({ ...editMode, name: true })} />)}
                  </h5>) : (
                    <input
                      type="text"
                      value={name}
                      onBlur={() => setEditMode({ ...editMode, name: false })}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  )}

                </div>

              </motion.div>

              <motion.div
                className="user_item"
                initial={{ y: "100vh" }}
                animate={{
                  opacity: [0, 0.5, 1],
                  y: [100, 0, 0],
                }}
                transition={{
                  type: "twin",
                  duration: 0.5,
                }}
              >
                <div className="user_headline">
                  <img src={EmailIcon} alt="Email Icon" className="edit-profile-icon" />
                  {!editMode.email ? (<h5 onMouseEnter={() => setShowEditIcons({ ...showEditIcons, email: true })} onMouseLeave={() => setShowEditIcons({ ...showEditIcons, email: false })}>
                    {email}
                    {showEditIcons.email && (<img src={EditIcon} alt="Edit Icon" className="edit-icon" onClick={() => setEditMode({ ...editMode, email: true })} />)}
                  </h5>)
                    : (
                      <input
                        type="email"
                        value={email}
                        onBlur={() => setEditMode({ ...editMode, email: false })}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                      />
                    )}
                </div>
              </motion.div>

            </div>
          }
          <button onClick={handleSaveProfile} disabled={isLoading} >
            Save Profile
            {isLoading && (
              <span className="spinner-border spinner-border-sm mx-1" role="status"></span>
            )}
          </button>
        </motion.div>
      </div>
      <Nav />
    </>
  );
};

export default EditProfile;