import React from "react";

import "./Authenticated.css";

import SideBar from "../../Components/SideBar/SideBar";
import Dashboard from "../Dashboard";
import Sales from "../Sales";
import Account from "../Account/Account";

import { Routes, Route } from "react-router-dom";

function Authenticated() {
  return (
    <div className="temp">
      <div className="sidebar_container">
        <SideBar />
      </div>
      <div className="main_content">
        <div className="gap_div">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Authenticated;
