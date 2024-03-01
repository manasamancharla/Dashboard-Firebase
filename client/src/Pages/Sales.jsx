import React, { useEffect } from "react";
import { UserAuth } from "../Config/AuthContext";

function Sales() {
  const { user } = UserAuth();
  const displayName = user.displayName;

  const containerStyle = {
    position: "relative",
    height: "100%",
    backgroundColor: "white",
    borderRadius: "16px",
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontFamily: "'Open Sans', sans-serif",
    color: "#9999a0",
  };

  if (!displayName) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2>Sales of {displayName}</h2>
        <p>We are currently working on this page. Please check back later.</p>
      </div>
    </div>
  );
}
export default Sales;
