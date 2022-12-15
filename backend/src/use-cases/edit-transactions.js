const { TransactionsDAO } = require("../db-access");

async function updateTransaction({ transactionId, ...newValue }) {
  const updatedTransaction = await TransactionsDAO.editTransaction(
    transactionId,
    newValue
  );
  return updatedTransaction;
}

module.exports = {
  updateTransaction,
};
