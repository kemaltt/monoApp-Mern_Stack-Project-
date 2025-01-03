const express = require("express");
const multer = require("multer");
const { makeDoAuthMiddleware } = require("../auth/doAuthMiddleware");
const { showAllTransactions } = require("../controllers/transaction-controller/show-all-transactions");
const { createNewTransaction } = require("../controllers/transaction-controller/add-transaction");
const { showDetailTransaction } = require("../controllers/transaction-controller/show-transactions-detail");
const { removeTransaction } = require("../controllers/transaction-controller/delete-transaction");
const { updateTransaction } = require("../controllers/transaction-controller/edit-transaction");
const { upload, uploadToFirebase } = require("../services/file-upload.service");
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

// const storage = multer.diskStorage({
//   destination: function (_, _, cb) {
//     cb(null, "uploads/receipt");
//   },
//   filename: function (_, file, cb) {
//     cb(null, file.originalname); //Appending extension
//   },
// });
// const upload = multer({ storage });
const uploadMiddleware = upload.single("img");

transactionsRouter.post(
  "/transaction/add",
  uploadMiddleware,
  doAuthMiddleware,
  async (req, res) => {
    if (!req.body) {
      res.status(200).json({ error: "Please include a new Income" });
      return;
    }
    const userId = req.userClaims.sub;

    console.log('userId', userId);


    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }


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

    if (req.file) {
      const transactionId = addedIncome.id;
      console.log('transactionId', transactionId);

      const file = req.file; // req.file'deki dosyayı değişkene ata
      const uploadedFile = await uploadToFirebase(file, "img", transactionId, userId);
      console.log('file uploaded', uploadedFile);

      updateTransaction({ ...addedIncome, img: uploadedFile }, userId)
        .then((updatedTransaction) => res.json(updatedTransaction))
        .catch((err) => {
          console.log(err);
          res.status(500).json("Unknown error while editing a Transaction.");
        });
    }

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

      // Varsayılan olarak img alanını null yapıyoruz.
      let img = null;

      if (req.file) {
        const file = req.file;
        // Resmi Firebase'e yükle ve URL'sini al
        const uploadedFile = await uploadToFirebase(file, "img", transactionId, userId);
        console.log("File uploaded:", uploadedFile);
        img = uploadedFile; // img alanını yüklenen dosyanın URL'si ile güncelle
      }

      const transactionUpdateInfo = {
        transactionId,
        name: req.body.name,
        amount: Number(req.body.amount),
        income: income === "true" ? true : false,
        createdAt: new Date(req.body.createdAt).getTime(),
        img, // Eğer img varsa URL, yoksa null olarak atanır
      };

      // Veritabanını güncelle
      const updatedTransaction = await updateTransaction(transactionUpdateInfo, userId);

      // Güncellenmiş veriyi döndür
      res.json(updatedTransaction);
    } catch (error) {
      console.error(error);
      res.status(500).json("Unknown error while editing a Transaction.");
    }
  }
);


module.exports = {
  transactionsRouter,
};
