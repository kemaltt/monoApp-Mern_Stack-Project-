import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import left from "../img/chevron-left.png";
import dots from "../img/threeDots.png";
import up from "../img/chevron-up.png";
import Nav from "../components/Nav";
import Loading from "../components/Loading";
import { apiBaseUrl } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import TopMobileBar from "../components/TopMobileBar";

const TransactionsDetails = ({ walletInfo, token }) => {
  const { id } = useParams();
  const [detailTransaction, setDetailTransaction] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${apiBaseUrl}/transactions/details/${id}`, {
      headers: {
        token: "JWT " + token,
      },
    })
      .then((res) => res.json())
      .then((detailObj) => setDetailTransaction(detailObj))
      .catch((err) => console.log(err));
  }, [token, id]);

  if (detailTransaction === undefined) {
    return <Loading />;
  }

  return (
    detailTransaction && (
      <div>
        <div className="transactionDetails">
          <TopMobileBar />
          <div className="topBlueContainer">
            <img onClick={() => navigate(-1)} src={left} alt="left" />

            <h4>Transaction Details</h4>
            <img src={dots} alt="threeDots" />
          </div>
          <div className="whiteContainer">
            {/* <img src={Icon} alt="icon" className="icon" /> */}
            <div className="transaction_icon">
              <h3>{detailTransaction.name.charAt(0)}</h3>
            </div>
            <p
              style={
                detailTransaction.income
                  ? { color: "#25A969" }
                  : { color: "#F95B51" }
              }
              className="incomeOrExpense"
            >
              {detailTransaction.income ? "Income" : "Expense"}
            </p>
            <h2>${detailTransaction.amount.toFixed(2)} </h2>
            <div className="headlineGroup">
              <h5>Transaction details </h5>
              <img src={up} alt="up" />
            </div>
            <div className="transactionDetailsContainer">
              <div className="status">
                <p>
                  Status
                  <span
                    style={
                      detailTransaction.income
                        ? { color: "#25A969" }
                        : { color: "#F95B51" }
                    }
                    className="spanIncomeOrExpense"
                  >
                    {detailTransaction.income ? "Income" : "Expense"}
                  </span>
                </p>
                <p>
                  From <span>{detailTransaction.name}</span>
                </p>
                <p>
                  Time
                  <span>
                    {new Date(detailTransaction.createdAt).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </span>
                </p>
                <p>
                  Date
                  <span>
                    {new Date(detailTransaction.createdAt)
                      .toUTCString()
                      .slice(0, 17)}
                  </span>
                </p>
              </div>
              <p className="spending">
                {detailTransaction.income ? "Earnings" : "Spending"}
                <span>$ {detailTransaction.amount.toFixed(2)}</span>
              </p>
              <p className="total">
                Total <span>$ {detailTransaction.amount.toFixed(2)}</span>
              </p>

              <div className="receipt_container">
                <p>Receipt</p>
                {detailTransaction.img ? (
                  <img
                    src={
                      detailTransaction.img?.startsWith("http")
                        ? detailTransaction.img
                        : `${apiBaseUrl}/${detailTransaction.img}`
                    }
                    // alt={detailTransaction.img}
                    alt="upload receipt"
                  />
                ) : null}
              </div>
              <div className="buttonContainer">
                <Link
                  to={
                    detailTransaction.income
                      ? `/editIncome/${detailTransaction._id}`
                      : `/editExpense/${detailTransaction._id}`
                  }
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="navContainer">
          <Nav />
        </div>
      </div>
    )
  );
};

export default TransactionsDetails;
