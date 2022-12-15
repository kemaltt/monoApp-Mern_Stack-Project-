import "./App.scss";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Statistic from "./pages/Statistic";
import TransactionsDetails from "./pages/TransactionsDetails";
import Onboarding from "./pages/Onboarding";
import Splashscreen from "./pages/SplashScreen";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Add from "./pages/Add";
import EditExpense from "./components/EditExpense";
import EditIncome from "./components/EditIncome";
import AuthRequired from "./components/AuthRequired";
import { apiBaseUrl } from "./api/api";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [token, setToken] = useState(null);
  console.log(token);
  const [replyCounter, setReplyCounter] = useState(0); // used to repload feed
  const onTransactionReply = () => setReplyCounter((prev) => prev + 1);

  const [walletInfo, setWalletInfo] = useState(null);

  // const updateTransaction = (editedTransaction) => {
  //   const newWalletInfo = walletInfo.transactions.map((el) =>
  //     el._Id === editedTransaction._id ? editedTransaction : el
  //   );
  //   setWalletInfo(newWalletInfo);
  // };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`${apiBaseUrl}/users/showWallet`, {
      method: "GET",
      headers: {
        token: "JWT " + token,
      },
    })
      .then((response) => response.json())
      .then((walletResult) => setWalletInfo(walletResult));
  }, [token, replyCounter]);

  console.log(walletInfo);
  console.log(replyCounter);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={token ? "/home" : "/splash"} />}
          />
          <Route path="/splash" element={<Splashscreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login setToken={setToken} />} />

          <Route
            path="/home"
            element={
              <AuthRequired token={token} setToken={setToken}>
                <Home
                  token={token}
                  setToken={setToken}
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/wallet"
            element={
              <AuthRequired token={token} setToken={setToken}>
                <Wallet
                  token={token}
                  setToken={setToken}
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/statistic"
            element={
              <AuthRequired token={token} setToken={setToken}>
                <Statistic
                  token={token}
                  setToken={setToken}
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/detail/:id"
            element={
              <AuthRequired token={token} setToken={setToken}>
                <TransactionsDetails
                  token={token}
                  setToken={setToken}
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/profile"
            element={
              <AuthRequired token={token} setToken={setToken}>
                <Profile
                  walletInfo={walletInfo}
                  token={token}
                  setToken={setToken}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/add"
            element={
              <AuthRequired token={token} setToken={setToken}>
                <Add
                  onReply={onTransactionReply}
                  // updateTransaction={updateTransaction}
                  token={token}
                  setToken={setToken}
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/editExpense/:id"
            element={
              <AuthRequired token={token} setToken={setToken}>
                <EditExpense
                  onReply={onTransactionReply}
                  // updateTransaction={updateTransaction}
                  token={token}
                  setToken={setToken}
                />
              </AuthRequired>
            }
          />
          <Route
            path="/editIncome/:id"
            element={
              <AuthRequired token={token} setToken={setToken}>
                <EditIncome
                  onReply={onTransactionReply}
                  // updateTransaction={updateTransaction}
                  token={token}
                  setToken={setToken}
                />
              </AuthRequired>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
