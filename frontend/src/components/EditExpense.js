import React, { useEffect } from "react";
import { useState } from "react";
import left from "../img/chevron-left.png";
import Delete from "../components/Icons/Delete";
import Nav from "../components/Nav";
import "../scss/EditExpense.scss";
import { useNavigate, useParams } from "react-router-dom";
import { IoReceiptSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import TopMobileBar from "./TopMobileBar";
import { useDeleteFromTransactionMutation, useGetTransactionByIdMutation, useUpdateTransactionByIdMutation } from "../redux/transaction/transaction-api";




const EditExpense = () => {

  const { id } = useParams();

  const [deleteFromTransaction] = useDeleteFromTransactionMutation()
  const [getTransactionById] = useGetTransactionByIdMutation()
  const [updateTransactionById, { isLoading }] = useUpdateTransactionByIdMutation()

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [img, setReceipt] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionById(id).unwrap();
        if (response) {
          setName(response.name);
          setAmount(response.amount);
          setCreatedAt(new Date(response.createdAt).toISOString().substring(0, 16));
          setReceipt(response.img || null);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, [id, getTransactionById]);

  const deleteTransaction = async () => {
    await deleteFromTransaction(id).unwrap()
    navigate("/home");
  };

  const editTransaction = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("createdAt", createdAt);
    formData.set("income", false);
    if (img) {
      formData.append("img", img, img.name);
    }

    await updateTransactionById({ id, formData }).unwrap()
    navigate("/home");
  };

  return (
    <>
      <div className="edit_expense">
        <div className="pink">
          <TopMobileBar />
          <div className="icon_expense">
            <img onClick={() => navigate(-1)} src={left} alt="left" />

            <div onClick={deleteTransaction} className="del_icon">
              <Delete />
            </div>
          </div>
          <h4>Edit Expense</h4>
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
            <label htmlFor="receipt">RECEIPT </label>

            <label className="custom-file-upload">
              <input
                type="file"
                onChange={(e) => setReceipt(e.target.files[0])}
              />
              <IoReceiptSharp size={24} /> Edit Receipt
            </label>

            <button onClick={editTransaction} disabled={isLoading} >Save
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
      <Nav />
    </>
  );
};

export default EditExpense;
