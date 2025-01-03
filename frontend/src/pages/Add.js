import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import left from "../img/chevron-left.png";
import dots from "../img/threeDots.png";
import Nav from "../components/Nav";
// import { IoReceiptSharp } from "react-icons/io5";
import { BiImageAdd, BiXCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import TopMobileBar from "../components/TopMobileBar";
import { useAddToTransactionMutation } from "../redux/transaction/transaction-api";

const Add = () => {
  const [addToTransaction, { isLoading }] = useAddToTransactionMutation();

  const [income, setIncome] = useState(true);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [img, setReceipt] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceipt(file);

      // Create an image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImg(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setReceipt(null);
    setPreviewImg(null);
  };

  async function handleTransaction(e) {
    e.preventDefault();
    if (!name) {
      alert("Enter name!");
    } else if (!amount) {
      alert("Enter amount!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("amount", amount);

      if (createdAt) {
        formData.append("createdAt", createdAt);
      } else {
        formData.append("createdAt", new Date());
      }

      if (img) {
        formData.append("img", img, img.name);
      }

      formData.append("income", income);

      await addToTransaction(formData).unwrap();
      navigate("/home");
    }
  }

  return (
    <>
      <div className="add">
        <div
          style={
            income
              ? { backgroundColor: "#00B495" }
              : { backgroundColor: "rgba(228, 121, 127, 1)" }
          }
          className="switchAddExpanseBtn"
        >
          <TopMobileBar />
          <button onClick={() => setIncome(true)}>Add Income</button>
          <button onClick={() => setIncome(false)}>Add Expense</button>
        </div>
        <div>
          <div className={income ? "green" : "red"}>
            <Link to="/home">
              <img src={left} alt="left" />
            </Link>

            <h4>{income ? "Add Income" : "Add Expense"}</h4>
            <img src={dots} alt="dots" />
          </div>

          <motion.form
            action=""
            initial={{ y: "-9vh" }}
            animate={{ y: 10 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 200,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
            onSubmit={handleTransaction}
          >
            <div className="formContent">
              <label>NAME</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="amount">AMOUNT</label>
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Amount"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <label htmlFor="date">DATE</label>
              <input
                type="datetime-local"
                name="date"
                id="date"
                required
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
              />

              <label htmlFor="receipt">RECEIPT</label>
              {previewImg ? (
                <div className="image-preview">
                  <img src={previewImg} alt="Uploaded receipt" className="img-fluid" />
                  <BiXCircle className="remove-icon" size={24} onClick={removeImage} />
                </div>
              ) : (
                <label className="custom-file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <BiImageAdd size={24} /> Add Receipt
                </label>
              )}

              <button
                className={income ? "active_income" : "active_expense"}
                type="submit"
                disabled={isLoading}
              >
                Save
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm mx-1"
                    role="status"
                  ></span>
                )}

              </button>
            </div>
          </motion.form>
        </div>
      </div>
      <Nav />
    </>
  );
};

export default Add;
