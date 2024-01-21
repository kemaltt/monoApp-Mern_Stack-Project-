const { TransactionsDAO } = require('../db-access');

function removeTransaction({transactionId}){
    return TransactionsDAO.deleteTransaction(transactionId)
};

module.exports = {removeTransaction};

