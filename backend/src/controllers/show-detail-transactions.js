const { TransactionsDAO } = require("../db-access");

function showDetailTransaction({ transactionId }) {
  return TransactionsDAO.findTransactionById(transactionId);
}

module.exports = {
  showDetailTransaction,
};
