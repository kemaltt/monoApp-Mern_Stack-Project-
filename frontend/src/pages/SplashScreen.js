import React from "react";
import { useNavigate } from "react-router-dom";
import "../scss/SplashScreen.scss";

const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="splashscreen">
      <h1 onClick={() => navigate("/onboarding")}>mono</h1>
    </div>
  );
};

export default SplashScreen;
