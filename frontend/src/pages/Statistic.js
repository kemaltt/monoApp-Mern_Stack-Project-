import BarChart from "../components/BarChart";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Vector from "../img/Vector.png";
import left from "../img/ArrowLeft.png";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetTransactionsMutation } from "../redux/transaction/transaction-api";
import { useSelector } from "react-redux";
// import TopMobileBar from "../components/TopMobileBar";

const Statistic = ({ token }) => {

  const [getTransactions] = useGetTransactionsMutation();
  const { transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (token) getTransactions(token);
  }, [token, getTransactions]);

  // Toplam işlemi için genel bir fonksiyon
  const sum = (accumulator, curr) => accumulator + curr;
  const hours24 = 86400000;

  // Belirli bir gün için gelir ve gider hesaplama fonksiyonu
  const calculateIncomeExpenses = (transactions, dayIdx) => {
    const currentTime = Date.now();
    const startOfDay = currentTime - hours24 * (dayIdx + 1);
    const endOfDay = currentTime - hours24 * dayIdx;

    const transactionsOfDay = transactions?.filter(
      (t) => t.createdAt > startOfDay && t.createdAt < endOfDay
    ) || [];

    const income = transactionsOfDay
      .filter((t) => t.income)
      .map((t) => t.amount)
      .reduce(sum, 0);

    const expenses = transactionsOfDay
      .filter((t) => !t.income)
      .map((t) => t.amount)
      .reduce(sum, 0);

    return { income, expenses };
  };

  // Son 7 gün için gelir ve gider verilerini hesaplama
  const last7DaysData = Array.from({ length: 7 }, (_, dayIdx) =>
    calculateIncomeExpenses(transactions?.transactions, dayIdx)
  );

  // Labels oluşturma fonksiyonu
  const generateLabels = (days) =>
    Array.from({ length: days }, (_, idx) =>
      new Date(Date.now() - hours24 * idx).toDateString().slice(0, 10)
    );

  const labels = generateLabels(7).reverse();

  // Dataset oluşturma fonksiyonu
  const createDataset = (label, data, backgroundColor) => ({
    label,
    data,
    backgroundColor,
    borderRadius: 3,
  });

  // Chart için data nesnesini oluşturma
  const dataWeek = {
    labels,
    datasets: [
      createDataset(
        "Income 7 Days",
        last7DaysData.map((day) => day.income),
        "#00B495"
      ),
      createDataset(
        "Expense 7 Days",
        last7DaysData.map((day) => day.expenses),
        "#E4797F"
      ),
      createDataset(
        "Total 7 Days",
        last7DaysData.map((day) => day.income - day.expenses),
        "#2B47FC"
      ),
    ],
    chartArea: {
      backgroundColor: "rgba(251, 85, 85, 0.4)",
    },
    maintainAspectRatio: false,
  };


  // ________________________________________________________

  const [sortStatistic, setSortStatistic] = useState(transactions);
  const [toggleTrans, setToggleTrans] = useState(true);

  const navigate = useNavigate();
  const asIncome = (amount, income) => (income ? amount : -amount);

  const amountSortDesc = () => {
    setSortStatistic([
      ...[...transactions.transactions].sort(
        (a, b) => asIncome(b.amount, b.income) - asIncome(a.amount, a.income)
      ),
    ]);
  };


  const amountSortAsc = () => {
    setSortStatistic([
      ...transactions.transactions.sort(
        (a, b) => asIncome(a.amount, a.income) - asIncome(b.amount, b.income)
      ),
    ]);
  };

  const handleToggleAmount = () => {
    setToggleTrans(!toggleTrans);
    toggleTrans ? amountSortDesc() : amountSortAsc();
  };

  const nameSortDesc = () => {
    setSortStatistic([
      ...sortStatistic.sort((a, b) => a.name.localeCompare(b.name)),
    ]);
  };
  

  const dateSortDesc = () => {
    setSortStatistic([
      ...transactions.transactions.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ),
    ]);
  };


  const handleSelect = (e) => {
    e.preventDefault();

    if (e.target.value === "Name") {
      nameSortDesc();
    } else if (e.target.value === "Date") {
      dateSortDesc();
    } else if (e.target.value === "Amount") {
      amountSortDesc();
    }
  };

  return (
    transactions && (
      <>
        <div className="statistic_container">
          {/* <TopMobileBar /> */}
          <div className="header_container">
            <div className="img">
              <img onClick={() => navigate(-1)} src={left} alt="left" />
            </div>

            <h4>Statistics</h4>
          </div>
          <div className="chart_data">
            <BarChart chartData={dataWeek} />
          </div>

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
              <img onClick={handleToggleAmount} src={Vector} alt={Vector} />
            </div>
          </div>
          <div className="transactionsHistory">
            <div>
              {transactions?.transactions?.map((ele, index) => (
                <Link key={index} to={`/detail/${ele._id}`}>
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
