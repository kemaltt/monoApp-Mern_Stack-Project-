const { TransactionsDAO } = require("../../db-access");


function showDetailTransaction({ transactionId, userId }) {
  return TransactionsDAO.findTransactionById(transactionId, userId);
}

module.exports = {
  showDetailTransaction,
};
