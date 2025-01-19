const { UserDAO, TransactionsDAO } = require("../../db-access");
const { makeUser } = require("../../domain/User");

async function showWallet({ userId }) {
  const foundUser = await UserDAO.findById(userId);
  if (!foundUser) {
    throw new Error("User doesn't exist...");
  }

  const user = makeUser(foundUser);
  const userView = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profile_image: user.profile_image,
    totalBalance: user.totalBalance,
  };

  const transactions = await TransactionsDAO.findAllTransactionsOfUser(
    user._id.toString()
  );

  return { ...userView, transactions };
}

module.exports = { showWallet };
