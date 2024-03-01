import React, { useState } from "react";

import "./SideBar.css";
import { UserAuth } from "../../Config/AuthContext";

import logo2 from "../../assets/logo2.png";
import { RxDashboard } from "react-icons/rx";
import { BsCartCheck } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import control from "../../assets/control.png";
import test from "../../assets/Chart_fill.png";

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

  const [open, setOpen] = useState(false);

  const Menus = [
    { title: "Dashboard", src: RxDashboard },
    { title: "Dashboard", src: RxDashboard },
    { title: "Dashboard", src: RxDashboard },
    { title: "Dashboard", src: RxDashboard },
    { title: "Accounts", src: RxDashboard, gap: true },
    { title: "Dashboard", src: RxDashboard },
    { title: "Dashboard", src: RxDashboard },
    { title: "Accounts", src: RxDashboard, gap: true },
  ];

  return (
    <>
      {/* <div className="sideBar_grid">
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
      </div> */}

      <div className="flex">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            src={control}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />

          <div className="flex gap-x-4 items-center">
            <img
              src={logo}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Dashboard
            </h1>
          </div>

          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex relative rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <img src={test} alt="" />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>

                {/* {!open && (
                  <div
                    className={`
      absolute left-full rounded-md px-2 py-1 ml-6
      bg-dark-purple text-light-white text-sm
      invisible opacity-20 -translate-x-3 transition-all
      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
    `}
                  >
                    {Menu.title}
                  </div>
                )} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
