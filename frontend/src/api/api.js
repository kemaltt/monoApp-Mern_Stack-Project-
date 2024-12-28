export const apiBaseUrl =
  process.env.REACT_APP_API_PATH === "production"
    ? "https://mono-v9zs.onrender.com"
    // ? "https://mono-app1.netlify.app"
    : "http://localhost:9000";
