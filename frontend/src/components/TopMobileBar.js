import MobileTopBarIcons from "../img/MobileTopBarIcons.png";

const TopMobileBar = () => {
  const date = new Date();
  const time = date.toLocaleTimeString().slice(0, 5);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        margin: "0 20px",
      }}
    >
      <p style={{ color: "white", fontSize: 13 }}>{time}</p>
      <div>
        <img src={MobileTopBarIcons} alt={MobileTopBarIcons} />
      </div>
    </div>
  );
};

export default TopMobileBar;
