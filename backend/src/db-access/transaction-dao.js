const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

const monoCollectionName = "transaction";

async function findTransactionById(transactionId) {
  const db = await getDB();
  const foundTransaction = await db
    .collection(monoCollectionName)
    .findOne({ _id: ObjectId(transactionId) });
  return foundTransaction;
}

async function findAllTransactionsOfUser(userId) {
  const db = await getDB();
  const allTransactions = await db
    .collection(monoCollectionName)
    .find({ userId: userId })
    .toArray();
  return allTransactions;
}

async function insertTransaction(addTransaction) {
  const db = await getDB();
  const insertResult = await db
    .collection(monoCollectionName)
    .insertOne(addTransaction);
  return insertResult;
}

async function deleteTransaction(transactionId) {
  const db = await getDB();
  const removeTransaction = db
    .collection(monoCollectionName)
    .findOneAndDelete({ _id: ObjectId(transactionId) });
  return removeTransaction;
}

async function editTransaction(transactionId, transactionObject) {
  const db = await getDB();

  return db
    .collection(monoCollectionName)
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
