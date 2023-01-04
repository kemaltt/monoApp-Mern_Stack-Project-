const express = require("express");
const multer = require("multer");
// const { doAuthMiddleware } = require("../auth/doAuthMiddleware");
const { makeDoAuthMiddleware } = require("../auth/doAuthMiddleware");
const { registerUser } = require("../use-cases/register-user");
const { showAllUser } = require("../use-cases/show-all-users");
const { loginUser } = require("../use-cases/login-user");
const { refreshUserToken } = require("../use-cases/refresh-user-token");
const { showMyProfile } = require("../use-cases/show-my-profile");
const { showWallet } = require("../use-cases/show-wallet");

const userRouter = express.Router();

const doAuthMiddleware = makeDoAuthMiddleware("access");
const doRefreshTokenMiddleware = makeDoAuthMiddleware("refresh");

userRouter.get("/allUsers", doAuthMiddleware, async (_, res) => {
  try {
    const allUsers = await showAllUser();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: error
          ? error.message
          : "Unknown error while loading all users.",
      },
    });
  }
});

const storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, "uploads/profile");
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});
const upload = multer({ storage });
const uploadMiddleware = upload.single("userImg");

userRouter.post("/register", uploadMiddleware, async (req, res) => {
  try {
    const userInfo = req.body;
    if (req.file) {
      userImg = req.file.originalname;
      const user = await registerUser({ ...userInfo, userImg });
      res.json(user);
    } else {
      const user = await registerUser({ ...userInfo });
      res.json(user);
    }
    // const user = await registerUser({ ...userInfo, userImg });
    // res.json(user);
  } catch (error) {
    console.log("register route", error);
    res.status(500).json({
      err: error.message || "Unknown error while registering new user.",
    });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { accessToken, refreshToken } = await loginUser({
      email: req.body.email,
      password: req.body.password,
    });
    if (refreshToken) {
      req.session.refreshToken = refreshToken;
    }
    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.toString() || "Internal Server Error.",
    });
  }
});
userRouter.get("/logout", async (req, res) => {
  req.session.refreshToken = null;
  res.status(200).json({});
});

userRouter.get("/showWallet", doAuthMiddleware, async (req, res) => {
  try {
    const userId = req.userClaims.sub;
    const userWallet = await showWallet({ userId });
    console.log(userWallet);
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
