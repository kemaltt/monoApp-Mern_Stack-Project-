function makeUser({
  _id,
  name,
  email,
  userImg,
  totalBalance,
  passwordHash,
  passwordSalt,
}) {
  if (!passwordHash && !password) {
    throw new Error("User must provide a password or passwordHash");
  }
  return {
    name,
    email,
    userImg: userImg,
    totalBalance: totalBalance || 0,
    passwordHash,
    passwordSalt,
    _id,
  };
}

module.exports = {
  makeUser,
};
