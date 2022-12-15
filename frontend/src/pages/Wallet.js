import React from "react";
import "../scss/Wallet.scss";
import Add from "../img/Add.png";
import Pay from "../img/Pay.png";
import Send from "../img/Send.png";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TopMobileBar from "../components/TopMobileBar";

const Wallet = ({ walletInfo }) => {
  const income =
    walletInfo && Array.isArray(walletInfo.transactions)
      ? walletInfo.transactions
          .filter((t) => t.income === true)
          .map((t) => t.amount)
          .reduce((sum, amount) => sum + amount, 0)
      : 0;

  console.log(income);
  const expenses =
    walletInfo && Array.isArray(walletInfo.transactions)
      ? walletInfo.transactions
          .filter((f) => f.income === false)
          .map((f) => f.amount)
          .reduce((sum, amount) => sum + amount, 0)
      : 0;

  const totalBalance = (income - expenses).toFixed(2);
  return (
    <>
      <div className="wallet">
        <TopMobileBar />
        <div className="topBlueContainer">
          <h4>Wallet</h4>
        </div>
        <motion.div
          className="whiteContainer"
          initial={{ y: "-8vh" }}
          animate={{ y: 10 }}
          transition={{
            delay: 0.5,
            duration: 0.3,
            stiffness: 200,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
        >
          <section>
            <p>Total Balance</p>
            <h2>${walletInfo && totalBalance}</h2>
          </section>
          <div className="addPaySendGroup">
            <div className="addGroup">
              <Link to="/add">
                <img src={Add} alt="add" />
                <figcaption>Add</figcaption>
              </Link>
            </div>
            <div className="payGroup">
              <a
                href="https://pay.google.com/intl/de_de/about/banks/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Pay} alt="pay" />
                <figcaption>Pay</figcaption>
              </a>
            </div>
            <div className="sendGroup">
              <a
                href="https://www.paypal.com/de/home"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Send} alt="send" />
                <figcaption>Send</figcaption>
              </a>
            </div>
          </div>
          <div className="transaction_header">
            <h6>Transactions History</h6>
          </div>
          <div className="transactionsHistory">
            <div>
              {walletInfo &&
                Array.isArray(walletInfo.transactions) &&
                walletInfo.transactions.map((ele, index) => (
                  <Link to={`/detail/${ele._id}`}>
                    <motion.div
                      className="transaction_item"
                      key={index}
                      initial={{ y: "100vh" }}
                      animate={{
                        opacity: [0, 0.5, 1],
                        y: [100, 0, 0],
                      }}
                      transition={{
                        type: "twin",
                        duration: 0.5,
                        delay: (parseInt(index) + 0.5) / 10,
                      }}
                    >
                      <div className="transaction_headline">
                        <div className="transaction_icon">
                          <h3> {ele.name && ele.name.charAt(0)}</h3>
                        </div>
                        <div className="transaction_name_date">
                          <h5>{ele.name}</h5>
                          <p>
                            {new Date(ele.createdAt).toLocaleDateString(
                              "de-DE",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <p
                        className="transaction_amount"
                        style={
                          ele.income
                            ? { color: "#25A969" }
                            : { color: "#F95B51" }
                        }
                      >
                        {ele.income ? `+ $${ele.amount}` : `- $${ele.amount}`}
                      </p>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Nav />
    </>
  );
};

export default Wallet;
