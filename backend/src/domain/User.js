function makeUser({
  _id,
  name,
  email,
  profile_image,
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
    profile_image: profile_image,
    totalBalance: totalBalance || 0,
    passwordHash,
    passwordSalt,
    _id,
  };
}

module.exports = {
  makeUser,
};
