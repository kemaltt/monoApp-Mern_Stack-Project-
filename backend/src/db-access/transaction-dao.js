const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

// const monoCollectionName = "Transactions";

async function findTransactionById(transactionId, userId) {
  const db = await getDB();
  const foundTransaction = await db
    .collection(userId)
    .findOne({ _id: ObjectId(transactionId) });
  return foundTransaction;
}

async function findAllTransactionsOfUser(userId) {
  const db = await getDB();
  const allTransactions = await db
    .collection(userId)
    .find({ userId: userId })
    .toArray();
  return allTransactions;
}

async function insertTransaction(addTransaction, userId) {
  const db = await getDB();
  const insertResult = await db
    .collection(userId)
    .insertOne(addTransaction);
  return insertResult;
}

async function deleteTransaction(transactionId, userId) {
  const db = await getDB();
  const removeTransaction = db
    .collection(userId)
    .findOneAndDelete({ _id: ObjectId(transactionId) });
  return removeTransaction;
}

async function editTransaction(transactionId, userId, transactionObject) {
  const db = await getDB();
  return db
    .collection(userId)
    .updateOne(
      { _id: new ObjectId(transactionId) },
      { $set: transactionObject }
    );
}

module.exports = {
  findAllTransactionsOfUser,
  findTransactionById,
  insertTransaction,
  deleteTransaction,
  editTransaction,
};
