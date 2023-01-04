// import BarChart from "../components/BarChart";
// import { useState } from "react";
import Nav from "../components/Nav";
import Vector from "../img/Vector.png";
import left from "../img/ArrowLeft.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopMobileBar from "../components/TopMobileBar";

const Statistic = ({ walletInfo }) => {
  // const sum = (accumulator, curr) => accumulator + curr;
  // const hours24 = 86400000;

  // const [
  //   { income: incomeReducedDay1, expenses: expensesReducedDay1 },
  //   { income: incomeReducedDay2, expenses: expensesReducedDay2 },
  //   { income: incomeReducedDay3, expenses: expensesReducedDay3 },
  //   { income: incomeReducedDay4, expenses: expensesReducedDay4 },
  //   { income: incomeReducedDay5, expenses: expensesReducedDay5 },
  //   { income: incomeReducedDay6, expenses: expensesReducedDay6 },
  //   { income: incomeReducedDay7, expenses: expensesReducedDay7 },
  // ] = Array.from(Array(7)).map((_, dayIdx) => {
  //   const arrDay =
  //     walletInfo &&
  //     walletInfo.transactions.filter(
  //       (t) =>
  //         t.createdAt > Date.now() - hours24 * (dayIdx + 1) &&
  //         t.createdAt < Date.now() - hours24 * dayIdx
  //     );

  //   const income = arrDay
  //     .filter((t) => t.income === true)
  //     .map((t) => t.amount)
  //     .reduce(sum, 0);

  //   const expenses = arrDay
  //     .filter((t) => t.income === false)
  //     .map((t) => t.amount)
  //     .reduce(sum, 0);

  //   return { income, expenses };
  // });

  // const dataWeek = {
  //   labels: [
  //     new Date(Date.now()).toDateString().slice(0, 10),
  //     new Date(Date.now() - 86400000).toDateString().slice(0, 10),
  //     new Date(Date.now() - 86400000 * 2).toDateString().slice(0, 10),
  //     new Date(Date.now() - 86400000 * 3).toDateString().slice(0, 10),
  //     new Date(Date.now() - 86400000 * 4).toDateString().slice(0, 10),
  //     new Date(Date.now() - 86400000 * 5).toDateString().slice(0, 10),
  //     new Date(Date.now() - 86400000 * 6).toDateString().slice(0, 10),
  //   ],
  //   datasets: [
  //     {
  //       label: "Income 7 Days",
  //       data: [
  //         incomeReducedDay1,
  //         incomeReducedDay2,
  //         incomeReducedDay3,
  //         incomeReducedDay4,
  //         incomeReducedDay5,
  //         incomeReducedDay6,
  //         incomeReducedDay7,
  //       ],
  //       backgroundColor: ["#00B495"],
  //       borderRadius: "3",
  //     },
  //     {
  //       label: "Expense 7 Days",
  //       data: [
  //         expensesReducedDay1,
  //         expensesReducedDay2,
  //         expensesReducedDay3,
  //         expensesReducedDay4,
  //         expensesReducedDay5,
  //         expensesReducedDay6,
  //         expensesReducedDay7,
  //       ],
  //       backgroundColor: ["#E4797F"],
  //       borderRadius: "3",
  //     },
  //     {
  //       label: "Total 7 Days",
  //       data: [
  //         incomeReducedDay1 - expensesReducedDay1,
  //         incomeReducedDay2 - expensesReducedDay2,
  //         incomeReducedDay3 - expensesReducedDay3,
  //         incomeReducedDay4 - expensesReducedDay4,
  //         incomeReducedDay5 - expensesReducedDay5,
  //         incomeReducedDay6 - expensesReducedDay6,
  //         incomeReducedDay7 - expensesReducedDay7,
  //       ],
  //       backgroundColor: ["#2B47FC"],
  //       borderRadius: "3",
  //     },
  //   ],
  //   chartArea: {
  //     backgroundColor: "rgba(251, 85, 85, 0.4)",
  //   },
  //   maintainAspectRatio: false,
  // };

  // ________________________________________________________

  // const [sortStatistic, setSortStatistic] = useState(walletInfo);
  // const [toggleTrans, setToggleTrans] = useState(true);

  const navigate = useNavigate();
  // const asIncome = (amount, income) => (income ? amount : -amount);

  // const amountSortDesc = () => {
  //   setSortStatistic([
  //     ...walletInfo.transactions.sort(
  //       (a, b) => asIncome(b.amount, b.income) - asIncome(a.amount, a.income)
  //     ),
  //   ]);
  // };

  // const amountSortAsc = () => {
  //   setSortStatistic([
  //     ...walletInfo.transactions.sort(
  //       (a, b) => asIncome(a.amount, a.income) - asIncome(b.amount, b.income)
  //     ),
  //   ]);
  // };

  // const handleToggleAmount = () => {
  //   setToggleTrans(!toggleTrans);
  //   toggleTrans ? amountSortDesc() : amountSortAsc();
  // };

  // const nameSortDesc = () => {
  //   setSortStatistic([
  //     ...walletInfo.transactions.sort((a, b) => {
  //       if (a.name < b.name) {
  //         return -1;
  //       } else if (a.name > b.name) {
  //         return 1;
  //       }
  //       return 0;
  //     }),
  //   ]);
  // };
  // const dateSortDesc = () => {
  //   setSortStatistic([
  //     ...walletInfo.transactions.sort((a, b) => b.createdAt - a.createdAt),
  //   ]);
  // };

  const handleSelect = (e) => {
    e.preventDefault();

    // if (e.target.value === "Name") {
    //   nameSortDesc();
    // } else if (e.target.value === "Date") {
    //   dateSortDesc();
    // } else if (e.target.value === "Amount") {
    //   amountSortDesc();
    // }
  };

  return (
    walletInfo && (
      <>
        <div className="statistic_container">
          <TopMobileBar />
          <div className="header_container">
            <div className="img">
              <img onClick={() => navigate(-1)} src={left} alt="left" />
            </div>

            <h4>Statistics</h4>
          </div>
          {/* <div className="chart_data">
            <BarChart chartData={dataWeek} />
          </div> */}

          <div className="transaction_header">
            <h6>Top Spending</h6>
            <div style={{ display: "flex", gap: "5px" }}>
              <form action="">
                <select
                  style={{
                    borderColor: "#6666",
                    padding: "3px",
                    borderRadius: "8px",
                    width: "90px",
                  }}
                  onChange={handleSelect}
                  name=""
                  id=""
                >
                  <option value="">Filter by</option>
                  <option value="Amount">Amount</option>
                  <option value="Name">Name</option>
                  <option value="Date">Date</option>
                </select>
              </form>
              <img
                // onClick={handleToggleAmount}
                src={Vector}
                alt={Vector}
              />
            </div>
          </div>
          <div className="transactionsHistory">
            <div>
              {walletInfo.transactions.map((ele, index) => (
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
                        <h3>{ele.name && ele.name.charAt(0)}</h3>
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
        </div>
        <Nav />
      </>
    )
  );
};

export default Statistic;
