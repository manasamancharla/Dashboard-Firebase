import React, { useState, useEffect } from "react";
import { UserAuth } from "../../Config/AuthContext";

import "./Account.css";

function Account() {
  const {
    user,
    changeEmail,
    changeUsername,
    changePassword,
    deleteUserAccount,
  } = UserAuth();

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountFlag, setAccountFlag] = useState(user.flag);

  console.log(accountFlag);

  useEffect(() => {
    // Save the accountFlag value to local storage whenever it changes
    if (accountFlag) {
      localStorage.setItem("accountFlag", accountFlag.toString());
    }
  }, [accountFlag]);

  useEffect(() => {
    // Retrieve the accountFlag value from local storage when the component mounts
    const storedAccountFlag = localStorage.getItem("accountFlag");
    if (storedAccountFlag === "true") {
      setAccountFlag(true);
    } else {
      setAccountFlag(false); // Default value when accountFlag is undefined
    }
  }, []);

  const handleUsernameChange = (e) => {
    setNewUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let changesMade = false;

    if (newUsername) {
      changeUsername(newUsername);
      setNewUsername("");
      changesMade = true;
    }

    if (newEmail) {
      changeEmail(newEmail);
      setNewEmail("");
      changesMade = true;
    }

    if (newPassword) {
      changePassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      changesMade = true;
    }

    if (changesMade) {
      alert("Changes were successful!");
    }
  };

  const handleClear = () => {
    setNewUsername("");
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  /* ********* Substitute Function, but gets the work done ********* */

  const deleteAccount = async () => {
    localStorage.removeItem("accountFlag");
    setAccountFlag(false);
    if (user) {
      await deleteUserAccount();
    }

    setTimeout(() => {
      alert("Account Deleted Successfully");
      window.location.reload();
    }, 3000); // 3 seconds delay
  };

  /* ********* Need to work on react router dom ********* */

  const containerStyle = {
    position: "relative",
    height: "100%",
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

  if (user.providerId === "google.com" && accountFlag === true) {
    return (
      <>
        <div className="account_div">
          <h2 className="account_title">Account of {user.displayName}</h2>

          <form className="account_form" onSubmit={handleFormSubmit}>
            <p>Change username</p>
            <input
              type="text"
              placeholder="Enter your username"
              value={newUsername}
              onChange={handleUsernameChange}
            />

            <div className="account_form_btn">
              <button className="form_btn" onClick={handleClear}>
                Clear
              </button>
              <button className="form_btn btn_primary " type="submit">
                Save
              </button>
            </div>
          </form>

          <div className="delete_account">
            <button className="form_btn dlt_btn" onClick={deleteAccount}>
              Delete account
            </button>
          </div>
        </div>
      </>
    );
  }

  if (accountFlag === false) {
    return (
      <>
        <div style={containerStyle}>
          <div style={contentStyle}>
            <h2>Deleting...</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="account_div">
        <h2 className="account_title">Account of {user.displayName}</h2>

        <form className="account_form" onSubmit={handleFormSubmit}>
          <p>Change username</p>
          <input
            type="text"
            placeholder="Enter your username"
            value={newUsername}
            onChange={handleUsernameChange}
          />
          <p>Change email</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={newEmail}
            onChange={handleEmailChange}
          />
          <p>Change password</p>
          <input
            type="password"
            placeholder="Enter your password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <p>Confirm new password</p>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div className="account_form_btn">
            <button className="form_btn" onClick={handleClear}>
              Clear
            </button>
            <button className="form_btn btn_primary " type="submit">
              Save
            </button>
          </div>
        </form>

        <div className="delete_account">
          <button className="form_btn dlt_btn" onClick={deleteAccount}>
            Delete account
          </button>
        </div>
      </div>
    </>
  );
}

export default Account;
