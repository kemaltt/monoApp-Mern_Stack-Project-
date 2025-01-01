const express = require("express");
const multer = require("multer");
const { makeDoAuthMiddleware } = require("../auth/doAuthMiddleware");
const { showAllTransactions } = require("../controllers/transaction-controller/show-all-transactions");
const { createNewTransaction } = require("../controllers/transaction-controller/add-transaction");
const { showDetailTransaction } = require("../controllers/transaction-controller/show-transactions-detail");
const { removeTransaction } = require("../controllers/transaction-controller/delete-transaction");
const { updateTransaction } = require("../controllers/transaction-controller/edit-transaction");
const doAuthMiddleware = makeDoAuthMiddleware("access");
const transactionsRouter = express.Router();

transactionsRouter.get("/all", doAuthMiddleware, (req, res) => {
  const userId = req.userClaims.sub;
  showAllTransactions({ userId })
    .then((transactions) => {
      return res.json(transactions);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Failed to load transactions from database" });
    });
});

const storage = multer.diskStorage({
  destination: function (_, _, cb) {
    cb(null, "uploads/receipt");
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});
const upload = multer({ storage });
const uploadMiddleware = upload.single("img");

transactionsRouter.post(
  "/transaction/add",
  uploadMiddleware,
  doAuthMiddleware,
  (req, res) => {
    if (!req.body) {
      res.status(200).json({ error: "Please include a new Income" });
      return;
    }
    const userId = req.userClaims.sub;
    let img;
    if (req.file) {
      img = req.file.originalname;
    }

    createNewTransaction({ userId, img, ...req.body })
      .then((addedIncome) => res.status(201).json(addedIncome))
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ error: "Failed to add new income to database." });
      });
  }
);

transactionsRouter.get("/transaction/:id", doAuthMiddleware, (req, res) => {
  const transactionId = req.params.id;
  const userId = req.userClaims.sub;
  showDetailTransaction({ transactionId, userId })
    .then((details) => res.json(details))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to show detailed transaction" });
    });
});

transactionsRouter.delete("/transaction/delete/:id", doAuthMiddleware, (req, res) => {
  const transactionId = req.params.id;
  const userId = req.userClaims.sub;

  removeTransaction({ transactionId, userId })
    .then((removeTransaction) => res.json({ removeTransaction }))
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "Failed to remove transaction from database." });
    });
});

transactionsRouter.put(
  "/transaction/edit/:id",
  uploadMiddleware,
  doAuthMiddleware,
  async (req, res) => {
    try {
      const transactionId = req.params.id;
      const userId = req.userClaims.sub;
      const income = req.body.income;

      const transactionUpdateInfo = {
        transactionId,
        name: req.body.name,
        amount: Number(req.body.amount),
        income: income === "true" ? true : false,
        createdAt: new Date(req.body.createdAt).getTime(),
      };

      if (req.file) {
        transactionUpdateInfo.img = req.file.originalname;
      }


      const updatedTransaction = await updateTransaction(transactionUpdateInfo, userId);
      // const updatedTransaction = await updateTransaction({
      //   ...userInfo,
      //   transactionId,
      //   img,
      // });

      res.json(updatedTransaction);
    } catch (error) {
      console.log(error);
      res.status(500).json("Unknown error while editing a Transaction.");
    }
  }
);

module.exports = {
  transactionsRouter,
};
