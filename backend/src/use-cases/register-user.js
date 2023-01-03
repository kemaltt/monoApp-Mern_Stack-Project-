const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { hash, createRandomHash } = require("../utils/hash");

async function registerUser({ name, email, password, userImg }) {
  const foundUser = await UserDAO.findByEmail(email);
  const passwordSalt = createRandomHash();
  const passwordHash = hash(password + "" + passwordSalt);
  if (foundUser) {
    throw new Error("your email address is registered,please login");
    // return "your email address is registered,please login";
  } else {
    const newUser = makeUser({
      name,
      email,
      userImg,
      passwordHash,
      passwordSalt,
    });

    const insertResult = await UserDAO.insertUser(newUser);
    const userView = {
      _id: insertResult.insertedId,
      name,
      email,
    };

    return userView;
  }
}

module.exports = {
  registerUser,
};
