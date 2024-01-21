const { TransactionsDAO } = require('../db-access');

function removeTransaction({transactionId,userId}){
    return TransactionsDAO.deleteTransaction(transactionId,userId)
};

module.exports = {removeTransaction};

