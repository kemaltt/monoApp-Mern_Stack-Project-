const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const jwt = require("jsonwebtoken");
const { hash } = require("../utils/hash");
const { createToken } = require("../utils/createToken");

async function loginUser({ email, password }) {
  const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i;
  const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;
  const foundUser = await UserDAO.findByEmail(email);

  if (!email) {
    throw new Error("E-Mail must exist.");
  } 
  
  if (!password) {
    throw new Error("Password must exist!");
  } 
  
  if (!foundUser) {
    throw new Error("Your email or password is incorrect,please try again");
  }

  const user = makeUser(foundUser);
  const passwordHash = hash(password + "" + user.passwordSalt);

  const correctPassword = user.passwordHash === passwordHash;
  if (!correctPassword) {
    throw new Error("Your email or password is incorrect,please try again ");
  }

  const ONE_DAY = 24 * 60 * 60;
  const accessToken = createToken(user);
  const refreshToken = createToken(user, ONE_DAY, "refresh");
  return { accessToken, refreshToken };
}

module.exports = {
  loginUser,
};
