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
import { AppProvider, useAppContext } from "./context/AppContext";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  // const [token, setToken] = useState("");
  const [replyCounter, setReplyCounter] = useState(0); // used to repload feed
  const onTransactionReply = () => setReplyCounter((prev) => prev + 1);
  const appctx = useAppContext();
  const { token, saveToken } = appctx;
  const [walletInfo, setWalletInfo] = useState(null);
  // const { trigger, updateTrigger } = useAppContext();
  // console.log(trigger);
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
      .then((walletResult) => {
        setWalletInfo(walletResult);

      });
  }, [token, replyCounter]);


  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route
            path="/"
            element={<Navigate to={token ? "/home" : "/onboarding"} />}
          />
          <Route path="/splash" element={<Splashscreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login saveToken={saveToken} onReply={onTransactionReply} />} />

          <Route
            path="/home"
            element={
              <AuthRequired token={token} setToken={saveToken}>
                <Home
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/wallet"
            element={
              <AuthRequired token={token} setToken={saveToken}>
                <Wallet
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/statistic"
            element={
              <AuthRequired token={token} setToken={saveToken}>
                <Statistic
                  walletInfo={walletInfo}
                  token={token}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/detail/:id"
            element={
              <AuthRequired token={token} setToken={saveToken}>
                <TransactionsDetails
                  walletInfo={walletInfo}
                  token={token}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/profile"
            element={
              <AuthRequired token={token} setToken={saveToken}>
                <Profile
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/add"
            element={
              <AuthRequired token={token} setToken={saveToken}>
                <Add
                  onReply={onTransactionReply}
                  walletInfo={walletInfo}
                />
              </AuthRequired>
            }
          />

          <Route
            path="/editExpense/:id"
            element={
              <AuthRequired token={token} setToken={saveToken}>
                <EditExpense
                  onReply={onTransactionReply}
                  token={token}
                />
              </AuthRequired>
            }
          />
          <Route
            path="/editIncome/:id"
            element={
              <AuthRequired token={token} setToken={saveToken}>
                <EditIncome
                  onReply={onTransactionReply}
                  token={token}
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
