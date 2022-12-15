const cors = require("cors");
const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const PORT = process.env.PORT || 9000;
const morgan = require("morgan");
const { transactionsRouter } = require("./src/routes/transactions-routes");
const { userRouter } = require("./src/routes/user-routes");

app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
//Hi

const oneDayInMs = 24 * 60 * 60 * 1000;
const isLocalHost = process.env.FRONTEND_URL === "http://localhost:3000";
app.set("trust proxy", 1); // trust first proxy
// cookie session parser
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;
if (!cookieSessionSecret) {
  throw new Error("COOKIE_SESSION_SECRET env variable is required");
}
app.use(
  cookieSession({
    name: "session",
    secret: cookieSessionSecret,
    httpOnly: true,
    expires: new Date(Date.now() + oneDayInMs),
    sameSite: isLocalHost ? "lax" : "none",
    secure: isLocalHost ? false : true,
  })
);

app.use(morgan("dev"));
app.use(express.static("uploads/profile"));
app.use(express.static("uploads/receipt"));
app.use(express.json());

app.use("/transactions", transactionsRouter);
app.use("/users", userRouter);

// Routes
app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
