export const apiBaseUrl =
  process.env.REACT_APP_API_PATH === "production"
    ? "https://mono-v9zs.onrender.com"
    : "http://localhost:9000";
