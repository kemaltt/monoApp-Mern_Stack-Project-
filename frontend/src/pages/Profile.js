import { Link, useNavigate } from "react-router-dom";
import userprofile from "../img/userProfile.png";
import users from "../img/users.png";
import envelope from "../img/envelope.png";
import shield from "../img/shield.png";
import lock from "../img/lock.png";
import Nav from "../components/Nav";
import { apiBaseUrl } from "../api/api";
import { motion } from "framer-motion";
import TopMobileBar from "../components/TopMobileBar";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const {transactions}  = useSelector((state) => state.transactions);
  const logOut = () => {
    fetch(apiBaseUrl + "/logout", { credentials: "include" });

    localStorage.removeItem('token');
    navigate("/onboarding");
  };

  return (
    transactions && (
      <div>
        <div className="profile">
          <div className="topBlueContainer">
            <TopMobileBar />
            <h4>Profile</h4>
          </div>
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
            <img
              src={
                transactions.userImg?.startsWith("http")
                  ? transactions.userImg
                  : `${apiBaseUrl}/${transactions.userImg}`
              }
              alt={transactions.userImg}
              className="profilePicture"
            />
          </motion.div>
          <h2 className="name">{transactions.name}</h2>
          <p className="username">{transactions.email}</p>
          <div className="profileContent">
            <p>
              {" "}
              <img src={userprofile} alt="profile icon" />{" "}
              <Link to="/profile">Account info</Link>
            </p>
            <p>
              {" "}
              <img src={users} alt="personal profile icon" />{" "}
              <Link to="/profile">Personal profile</Link>{" "}
            </p>
            <p>
              {" "}
              <img src={envelope} alt="message" />{" "}
              <Link to="/profile">Message center</Link>
            </p>
            <p>
              {" "}
              <img src={shield} alt="shield" />{" "}
              <Link to="/profile">Login and security</Link>{" "}
            </p>
            <p>
              {" "}
              <img src={lock} alt="lock" />{" "}
              <Link to="/profile">Data and privacy</Link>
            </p>
            <p onClick={logOut}>
              <img src={lock} alt="lock" /> <Link to="/profile">Log Out</Link>
            </p>
          </div>
        </div>
        <Nav />
      </div>
    )
  );
};

export default Profile;
