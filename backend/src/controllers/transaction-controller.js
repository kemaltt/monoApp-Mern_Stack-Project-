const TransactionModel = require("../models/TransactionModel");
const UserModel = require("../models/UserModel");

const addTransaction = async (req, res) => {
  const { amount, income } = req.body;
  const userId = req.userClaims.id;
  try {

    const newTransaction = new TransactionModel({ ...req.body, userId });
    await newTransaction.save();

    const updateAmount = income ? amount : -amount;

    console.log(updateAmount);

    await UserModel.findByIdAndUpdate(userId, { $inc: { total_amount: updateAmount } }, { new: true });

    res.status(201).json({
      ...newTransaction,
      userId,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

const getTransactions = async (req, res) => {
  const userId = req.userClaims.id;

  try {
    const transactions = await TransactionModel.find({ userId });
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found." });
    }
    const totalAmount = await UserModel.findById(userId, { total_amount: 1, _id: 0 });
    res.status(200).json({ transactions, totalAmount, userId });
  }
  catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}




module.exports = { addTransaction, getTransactions };