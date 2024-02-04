const { TransactionsDAO } = require("../db-access");
const { UserDAO } = require("../db-access");
const { makeUser } = require("../domain/User");

async function createNewTransaction({
  userId,
  amount,
  name,
  createdAt,
  income,
  img,
}) {
  const foundUser = await UserDAO.findById(userId);

  if (!foundUser) {
    throw new Error("User not found");
  }

  const transaction = {
    name,
    income: income === "true" ? true : false,
    amount: Number(amount),
    createdAt: new Date(createdAt).getTime(),
    img,
    userId,
  };

  const user = makeUser(foundUser);
  const totalBalance = user.totalBalance;

  console.log(user);

  const insertResult = await TransactionsDAO.insertTransaction(transaction,userId);
  const newTotalBalance = income
    ? totalBalance + Number(amount)
    : totalBalance - Number(amount);
  const updateResult = await UserDAO.updateUserTotalBalance(
    userId,
    newTotalBalance
  );

  return { insertResult, updateResult };
}

module.exports = { createNewTransaction };
