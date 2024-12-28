export const apiBaseUrl =
  process.env.REACT_APP_API_PATH === "production"
    ? "https://mono-app-mern-stack-project.vercel.app"
    : "http://localhost:9000";
