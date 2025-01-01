const { TransactionsDAO } = require("../../db-access");

async function updateTransaction({ transactionId, ...newValue }, userId) {

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
