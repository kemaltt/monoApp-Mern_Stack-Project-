const express = require("express");
const multer = require("multer");
const { showDetailTransaction,} = require("../controllers/show-detail-transactions");
const { makeDoAuthMiddleware } = require("../auth/doAuthMiddleware");
const { showAllTransactions } = require("../controllers/show-all-transactions");
const { removeTransaction } = require("../controllers/delete-transaction");
const { updateTransaction } = require("../controllers/edit-transactions");
const { createNewTransaction } = require("../controllers/add-transaction");
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
  "/add",
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

transactionsRouter.get("/details/:id", doAuthMiddleware, (req, res) => {
  const transactionId = req.params.id;
  console.log(transactionId);
  const userId = req.userClaims.sub;
  showDetailTransaction({ transactionId,userId })
    .then((details) => res.json(details))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Failed to show detailed transaction" });
    });
});

transactionsRouter.delete("/delete/:id", doAuthMiddleware, (req, res) => {
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
  "/edit/:id",
  uploadMiddleware,
  doAuthMiddleware,
  async (req, res) => {
    try {
      const transactionId = req.params.id;
      const userId = req.userClaims.sub;
      const income = req.body.income;

      const transactioUpdateInfo = {
        transactionId,
        name: req.body.name,
        amount: Number(req.body.amount),
        income: income === "true" ? true : false,
        createdAt: new Date(req.body.createdAt).getTime(),
      };

      if (req.file) {
        transactioUpdateInfo.img = req.file.originalname;
      }


      const updatedTransaction = await updateTransaction(transactioUpdateInfo,userId);
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
