import React from "react";
import { Link } from "react-router-dom";
import arrowUp from "../img/ArrowUp.png";
import threeDots from "../img/threeDots.png";
import ArrowUpIcon from "../components/Icons/ArrowUpIcon";
import ArrowDownIcon from "../components/Icons/ArrowDownIcon";
import Nav from "../components/Nav";
import { motion } from "framer-motion";
// import TopMobileBar from "../components/TopMobileBar";

const Home = ({ walletInfo }) => {
  const income =
    walletInfo && Array.isArray(walletInfo.transactions)
      ? walletInfo.transactions
        .filter((t) => t.income === true)
        .map((t) => t.amount)
        .reduce((sum, amount) => sum + amount, 0)
      : 0;

  const expenses =
    walletInfo && Array.isArray(walletInfo.transactions)
      ? walletInfo.transactions
        .filter((f) => f.income === false)
        .map((f) => f.amount)
        .reduce((sum, amount) => sum + amount, 0)
      : 0;
  // console.log(income);
  // console.log(expenses);
  const totalBalance = income - expenses;

  return (
    walletInfo && (
      <>
        <motion.div className="home">
          {/* <TopMobileBar /> */}
          <h4 className="home_headline">Home</h4>
          <motion.section
            initial={{ y: "-5vh" }}
            animate={{ y: 10 }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 200,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="headline">
              <h4>Total Balance </h4>
              <img src={arrowUp} alt="arrow up" />
              <img src={threeDots} alt="three dots" />
            </div>
            <div className="topBlueContainerContent">
              <h2>$ {totalBalance.toFixed(2)}</h2>
              <div className="income_expenses_container">
                <div className="income">
                  <h4>
                    <span>
                      <ArrowUpIcon />
                    </span>
                    Income
                  </h4>
                  <p>$ {income.toFixed(2)}</p>
                </div>
                <div className="expenses">
                  <h4>
                    <span>
                      <ArrowDownIcon />
                    </span>
                    Expenses
                  </h4>

                  <p>$ {expenses.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </motion.section>
          <div className="transaction_header">
            <h6>Transactions History</h6>
            <Link to="/wallet">
              <h6 style={{ color: " #666666" }}>See all</h6>
            </Link>
          </div>
          <div className="transactionsHistory">
            <div>
              {walletInfo?.transactions?.map((ele, index) => (
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
                      <div
                        style={
                          ele.income
                            ? { backgroundColor: "#25A969" }
                            : { backgroundColor: "#F95B51" }
                        }
                        className="transaction_icon"
                      >
                        <h3 style={{ color: "white" }}>
                          {ele.name && ele.name.charAt(0)}
                        </h3>
                      </div>
                      <div className="transaction_name_date">
                        <h5>{ele.name}</h5>
                        <p>
                          {new Date(ele.createdAt).toLocaleDateString("de-DE", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>

                    <p
                      className="transaction_amount"
                      style={
                        ele.income ? { color: "#25A969" } : { color: "#F95B51" }
                      }
                    >
                      {ele.income && ele.income
                        ? `+ $${ele.amount.toFixed(2)}`
                        : `- $${ele.amount.toFixed(2)}`}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
        <Nav />
      </>
    )
  );
};

export default Home;
