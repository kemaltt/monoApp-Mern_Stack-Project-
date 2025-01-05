const express = require("express");
// const multer = require("multer");
// const { doAuthMiddleware } = require("../auth/doAuthMiddleware");
const { makeDoAuthMiddleware } = require("../auth/doAuthMiddleware");
const { showWallet } = require("../controllers/wallet-controller/show-wallet");
const { showMyProfile } = require("../controllers/user-controller/show-my-profile");
const { refreshUserToken } = require("../controllers/user-controller/refresh-user-token");
const { loginUser } = require("../controllers/user-controller/login-user");
const { registerUser } = require("../controllers/user-controller/register-user");
const { showAllUser } = require("../controllers/user-controller/show-all-users");
const {  uploadToFirebase, upload } = require("../services/file-upload.service");
const UserModel = require("../models/UserModel");
const { register } = require("../controllers/auth-controller");

const userRouter = express.Router();

const doAuthMiddleware = makeDoAuthMiddleware("access");
const doRefreshTokenMiddleware = makeDoAuthMiddleware("refresh");

userRouter.get("/allUsers", doAuthMiddleware, async (_, res) => {
  try {
    const allUsers = await showAllUser();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({
      error: {
        message: error
          ? error.message
          : "Unknown error while loading all users.",
      },
    });
  }
});

// const storage = multer.diskStorage({
//   destination: function (_, _, cb) {
//     cb(null, "uploads/profile");
//   },
//   filename: function (_, file, cb) {
//     cb(null, file.originalname); //Appending extension
//   },
// });
// const upload = multer({ storage });
const uploadMiddleware = upload.single("userImg");

// userRouter.post("/register",uploadMiddleware ,register)
userRouter.post("/register", uploadMiddleware, async (req, res) => {
  try {
    const userInfo = req.body;
    const userId = 12345;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.file) {
      const file = req.file; // req.file'deki dosyayı değişkene ata
      const uploadedFile = await uploadToFirebase(file, "userImg", null, userId);
      console.log('file uploaded', uploadedFile);
      
      const user = await registerUser({ ...userInfo, userImg: uploadedFile });
      res.json(user);
    } else {
      const user = await registerUser({ ...userInfo });
      res.json(user);
    }

  } catch (error) {

    res.status(500).json({
      message: error.message || "Unknown error while registering new user.",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("E-Mail is required.");
    }

    if (!password) {
      throw new Error("Password is required.");
    }

    const { accessToken, refreshToken } = await loginUser({
      email,
      password
    });

    req.session.refreshToken = refreshToken;

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Internal Server Error.",
    });
  }
});
userRouter.get("/logout", async (req, res) => {
  req.session.refreshToken = null;
  res.status(200).json({message: 'Logged out successfully.'});
});

userRouter.get("/transactions", doAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userClaims.sub;
    const userWallet = await showWallet({ userId });

    res.status(200).json(userWallet);
  } catch (err) {
    res
      .status(500)
      .json({ err: { message: err ? err.message : "User not found..." } });
  }
});

userRouter.get("/profileInfo", doAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userClaims.sub; // an den token wird erkannt, um welchen user es sich handelt...
    const userProfile = await showMyProfile({ userId });
    res.status(200).json(userProfile);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: { message: err.message } });
  }
});

userRouter.post("/refreshtoken", doRefreshTokenMiddleware, async (req, res) => {
  try {
    const userId = req.userClaims.sub;

    const accessToken = await refreshUserToken({ userId });
    res.json({ token: accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Internal Server Error.",
    });
  }
});
module.exports = {
  userRouter,
};
