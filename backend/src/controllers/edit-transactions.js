const { TransactionsDAO } = require("../db-access");

async function updateTransaction({ transactionId,userId, ...newValue }) {
  const updatedTransaction = await TransactionsDAO.editTransaction(
    transactionId,
    userId,
    newValue
  );
  return updatedTransaction;
}

module.exports = {
  updateTransaction,
};
