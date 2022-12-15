import { Link, useNavigate } from "react-router-dom";
import Guy from "../img/Guy.png";
import Coin from "../img/Coin.png";
import Donut from "../img/Donut.png";

const Onboarding = () => {
  const navigate = useNavigate();
  return (
    <div className="onboarding">
      <div className="imageContainer">
        <img src={Coin} alt="coin" className="coin" />
        <img src={Donut} alt="coin" className="donut" />
        <img src={Guy} alt="the määän" className="guy" />
      </div>
      <div>
        <h1>Spend Smarter</h1>
        <h1>Save More</h1>
        <button onClick={() => navigate("/login")}>Get Started</button>
        <p>
          Have No Account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
