const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { hash, createRandomHash } = require("../utils/hash");

async function registerUser({ name, email, password, userImg }) {
  const passwordSalt = createRandomHash();
  const passwordHash = hash(password + "" + passwordSalt);

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

module.exports = {
  registerUser,
};
