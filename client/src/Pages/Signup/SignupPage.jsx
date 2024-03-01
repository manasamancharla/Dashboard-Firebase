import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./SignupPage.css";
import { UserAuth } from "../../Config/AuthContext";

import { FcGoogle } from "react-icons/fc";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user, createUser, googleSignIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (password !== confirmPassword) {
        alert("Passwords don't match");
        throw new Error("Passwords don't match");
      } else {
        await createUser(email, password, username);
        navigate("/authenticated/dashboard");
      }
    } catch (error) {
      setError(error.message);
      alert(error.message);
      console.log(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/authenticated/dashboard");
    }
  }, [user]);

  return (
    <div className="container signup_container">
      <div className="signup_wrapper">
        <div className="signup_grid">
          <div className="signup_img">
            <div className="s_image"></div>
          </div>
          <div className="signup_details">
            <div className="s_details_div">
              <form onSubmit={handleSubmit}>
                <h1>Create an account</h1>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className="signup_btn">
                  Sign up
                </button>

                <div className="s_or_container">
                  <span className="s_or_text">Or</span>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="signup_btn_secondary"
                >
                  <FcGoogle className="s_logo" /> Sign up with Google
                </button>

                <small>
                  Already have an account? <Link to="/login">Log in</Link>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
