import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import left from "../img/chevron-left.png";
import Delete from "../components/Icons/Delete";
import Nav from "../components/Nav";
import "../scss/EditIncome.scss";
import { apiBaseUrl } from "../api/api";
import { IoReceiptSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import TopMobileBar from "./TopMobileBar";
import { useDeleteFromTransactionMutation, useGetTransactionByIdMutation } from "../redux/transaction/transaction-api";
// import { useAppContext } from "../context/AppContext";

const EditIncome = ({ token, onReply }) => {
  // const { updateTrigger } = useAppContext();
  const { id } = useParams();
    const [deleteFromTransaction] = useDeleteFromTransactionMutation()
    const [getTransactionById] = useGetTransactionByIdMutation()
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [img, setReceipt] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionById({ id, token }).unwrap();
        if (response) {
          setName(response.name || "");
          setAmount(response.amount || "");
          setCreatedAt(
            response.createdAt
              ? new Date(response.createdAt).toISOString().substring(0, 16)
              : ""
          );
          setReceipt(response.img || null);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, [id, token, getTransactionById]);

  const deleteTransaction = async () => {
    await deleteFromTransaction({ id, token }).unwrap()
    navigate("/home");
  };
  const editTransaction = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("createdAt", createdAt);
    formData.set("income", true);
    if (img) {
      formData.append("img", img, img.name);
    }

    fetch(`${apiBaseUrl}/transactions/edit/${id}`, {
      method: "PUT",
      headers: {
        token: "JWT " + token,
      },

      body: formData,
    })
      .then((response) => response.json())
      .then((editedTransaction) => {

        if (editedTransaction.acknowledged) {
          onReply();
          // updateTrigger();
          navigate("/home");
        }
      });
  };
  return (
    <>
      <div className="edit_income">
        <div className="green">
          <TopMobileBar />
          <div className="icon_income">
            <img onClick={() => navigate(-1)} src={left} alt="left" />

            <div onClick={deleteTransaction} className="del_icon">
              <Delete />
            </div>
          </div>
          <h4>Edit Income</h4>
        </div>

        <motion.form
          action=""
          initial={{ y: "-10vh" }}
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
            <label htmlFor="amount">Name</label>
            <input
              type="text"
              name="amount"
              id="amount"
              placeholder="Name"
              required
              value={name}
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

            <button onClick={editTransaction}>Edit Transaction</button>
          </div>
        </motion.form>
      </div>
      <Nav />
    </>
  );
};

export default EditIncome;
