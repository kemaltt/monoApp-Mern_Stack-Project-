import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import left from "../img/chevron-left.png";
import dots from "../img/threeDots.png";
import Nav from "../components/Nav";
import { IoReceiptSharp } from "react-icons/io5";
import { apiBaseUrl } from "../api/api";
import { motion } from "framer-motion";
import TopMobileBar from "../components/TopMobileBar";

const Add = ({ token, setWalletInfo, updateTransaction, onReply }) => {
  const [income, setIncome] = useState(true);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [createdAt, setCreatedAt] = useState("");
  const [img, setReceipt] = useState("");
  const navigate = useNavigate();

  function handleTransaction(e) {
    e.preventDefault();
    console.log(income);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("createdAt", createdAt);

    if (img) {
      formData.append("img", img, img.name);
    }
    income ? formData.append("income", true) : formData.append("income", false);

    fetch(`${apiBaseUrl}/transactions/add`, {
      method: "POST",
      headers: { token: "JWT " + token },
      body: formData,
    })
      .then((response) => response.json())
      .then(
        (addedTransaction) =>
          setWalletInfo((previous) => [...previous, addedTransaction]),
        onReply()
      );

    navigate("/home");
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
          <div className={"green"}>
            <Link to="/home">
              {" "}
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

              <label className="custom-file-upload">
                <input
                  type="file"
                  onChange={(e) => setReceipt(e.target.files[0])}
                />
                <IoReceiptSharp size={24} /> Add Receipt
              </label>

              <button
                className={income ? "active_income" : "active_expense"}
                onClick={handleTransaction}
              >
                Add
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
