function makeTransaction({
  _id,
  name,
  amount,
  img,
  income,
  createdAt,
  userId,
}) {
  if (!name) {
    throw new Error("Name must exist.");
  }
  if (!amount) {
    throw new Error("Amount must exist.");
  }
  if (!userId) {
    throw new Error("UserId must exist.");
  }
  return {
    _id,
    name,
    income,
    amount,
    img,
    createdAt,
    userId,
  };
}

module.exports = {
  makeTransaction,
};
