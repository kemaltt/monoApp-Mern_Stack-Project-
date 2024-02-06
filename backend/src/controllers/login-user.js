const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const jwt = require("jsonwebtoken");
const { hash } = require("../utils/hash");
const { createToken } = require("../utils/createToken");

async function loginUser({ email, password }) {

  const foundUser = await UserDAO.findByEmail(email);

  if (!email) {
    throw new Error("E-Mail is required.");
  }

  if (!password) {
    throw new Error("Password is required.");
  }

  if (!foundUser) {
    throw new Error("Your email or password is incorrect!");
  }


  const user = makeUser(foundUser);
  const passwordHash = hash(password + "" + user.passwordSalt);

  const correctPassword = user.passwordHash === passwordHash;
  if (!correctPassword) {
    throw new Error("Your password is incorrect!");
  }

  const ONE_DAY = 24 * 60 * 60
  const accessToken = createToken(user);

  const refreshToken = createToken(user, ONE_DAY, "refresh");
  return { accessToken, refreshToken };
}

module.exports = {
  loginUser,
};
