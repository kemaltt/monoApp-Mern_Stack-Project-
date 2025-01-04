import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import left from "../img/chevron-left.png";
import Delete from "../components/Icons/Delete";
import Nav from "../components/Nav";
import "../scss/EditIncome.scss";
import { BiImageAdd, BiXCircle } from "react-icons/bi";
import { motion } from "framer-motion";
import TopMobileBar from "./TopMobileBar";
import {
  useDeleteFromTransactionMutation,
  useDeleteImageMutation,
  useGetTransactionByIdMutation,
  useUpdateTransactionByIdMutation,
} from "../redux/transaction/transaction-api";
import { apiBaseUrl } from "../api/api";

const EditIncome = () => {
  const { id } = useParams();
  const [deleteFromTransaction] = useDeleteFromTransactionMutation();
  const [getTransactionById, { data }] = useGetTransactionByIdMutation();
  const [deleteImage] = useDeleteImageMutation();
  const [updateTransactionById, { isLoading }] = useUpdateTransactionByIdMutation();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [img, setReceipt] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const navigate = useNavigate();
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactionById(id).unwrap();
        if (response) {
          setName(response.name);
          setAmount(response.amount);
          setCreatedAt(new Date(response.createdAt).toISOString().substring(0, 16));
          if (response.img) {
            setPreviewImg(
              response.img.url.startsWith("http")
                ? response.img.url
                : `${apiBaseUrl}/${response.img.url}`
            );
          }
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchData();
  }, [id, getTransactionById]);

  const deleteTransaction = async () => {
    await deleteFromTransaction(id).unwrap();
    navigate("/home");
  };

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

  const removeImage = async () => {
    if (data?.img)
      await deleteImage(data?.img?.url).unwrap();
    setReceipt(null);
    setPreviewImg(null);
  };

  const editTransaction = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("createdAt", createdAt);
    formData.set("income", true);
    if (img) {
      formData.append("img", img, img.name);
    }

    await updateTransactionById({ id, formData }).unwrap();
    navigate("/home");
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
          whileHover={{ scale: 1.01 }}
          onSubmit={editTransaction}
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

            <button type="submit" disabled={isLoading}>
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
      <Nav />
    </>
  );
};

export default EditIncome;
