export const apiBaseUrl =
  process.env.REACT_APP_API_PATH === "production"
    // ? "https://mono-app-mern-stack-project.vercel.app"
    ? "https://mono-app1.netlify.app"
    : "http://localhost:9000";
