const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");
const { hash, createRandomHash } = require("../utils/hash");

async function registerUser({ name, email, password, userImg }) {
  const nameVal = /^(?=)(?=).{4,15}$/;
  const emailVal = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i;
  const passwordVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

  const foundUser = await UserDAO.findByEmail(email);
  const passwordSalt = createRandomHash();
  const passwordHash = hash(password + "" + passwordSalt);
  if (foundUser) {
    throw new Error("Your email address is registered,please login");
    // return "your email address is registered,please login";
  } else if (!name) {
    throw new Error("Name must exist.");
  } else if (!name.match(nameVal)) {
    throw new Error(
      "Name must be greater than 4 characters and less than 15 characters."
    );
  } else if (!email) {
    throw new Error("E-Mail must exist.");
  } else if (!email.match(emailVal)) {
    throw new Error("Please enter a valid email address!");
  } else if (!password) {
    throw new Error("Password must exist!");
  } else if (!password.match(passwordVal)) {
    throw new Error("Please enter a valid password!");
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
