import React, { useState } from "react";

import "./SideBar.css";
import { UserAuth } from "../../Config/AuthContext";

import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo2.png";
import { RxDashboard } from "react-icons/rx";
import { BsCartCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const [activeLink, setActiveLink] = useState("/authenticated/dashboard");
  const { logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="sideBar_grid">
        <div className="logoDiv_flex">
          <img src={logo} alt="" />
        </div>
        <div className="sideBar_menu">
          <ul className="menu_flex">
            <li
              className={`list_item ${
                activeLink === "/authenticated/dashboard" ? "active" : ""
              }`}
              onClick={() => setActiveLink("/authenticated/dashboard")}
            >
              <Link to="/authenticated/dashboard" className="list_option">
                <RxDashboard /> Dashboard
              </Link>
            </li>
            <li
              className={`list_item ${
                activeLink === "/authenticated/sales" ? "active" : ""
              }`}
              onClick={() => setActiveLink("/authenticated/sales")}
            >
              <Link to="/authenticated/sales" className="list_option">
                <BsCartCheck /> Sales
              </Link>
            </li>
            <li
              className={`list_item ${
                activeLink === "/authenticated/account" ? "active" : ""
              }`}
              onClick={() => setActiveLink("/authenticated/account")}
            >
              <Link to="/authenticated/account" className="list_option">
                <FiSettings /> Account
              </Link>
            </li>
          </ul>
        </div>

        <div className="logout-div">
          <ul className="logout_flex">
            <li className="logout_item">
              <span className="logout_option" onClick={handleLogout}>
                <BiLogOut /> Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
