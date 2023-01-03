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

// function makeUser({
//   _id,
//   name,
//   email,
//   // profilePicture = "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
//   status = "off the line",
//   passwordHash,
//   passwordSalt,
// }) {
//   if (!email) {
//     throw new Error("email must exist");
//   }

//   return {
//     _id,
//     name,
//     // profilePicture,
//     email,
//     status,
//     passwordHash,
//     passwordSalt,
//   };
// }

module.exports = {
  makeUser,
};
