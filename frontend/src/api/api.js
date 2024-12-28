export const apiBaseUrl =
  process.env.REACT_APP_API_PATH === "production"
    // ? "https://mono-v9zs.onrender.com"
    ? "https://mono-app-mern-stack-project-pwcp.vercel.app"
    : "http://localhost:9000";
