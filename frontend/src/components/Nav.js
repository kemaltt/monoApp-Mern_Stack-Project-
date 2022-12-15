import React from "react";
import HomeIcon from "./Icons/HomeIcon";
import StatistikIcon from "./Icons/StatistikIcon";
import PlusIcon from "./Icons/PlusIcon";
import WalletIcon from "./Icons/WalletIcon";
import ProfilIcon from "./Icons/ProfilIcon";
import "../scss/Nav.scss";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <NavLink to="/home" activeclassname="active">
        <HomeIcon />
      </NavLink>

      <NavLink to="/statistic" activeclassname="active">
        <StatistikIcon />
      </NavLink>

      <NavLink to="/add" activeclassname="active">
        <div className="add_btn">
          <PlusIcon />
        </div>
      </NavLink>

      <NavLink to="/wallet" activeclassname="active">
        <WalletIcon />
      </NavLink>
      <NavLink to="/profile" activeclassname="active">
        <ProfilIcon />
      </NavLink>
    </div>
  );
};

export default Nav;
