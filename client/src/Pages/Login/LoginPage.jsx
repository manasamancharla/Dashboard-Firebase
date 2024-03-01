import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LoginPage.css";
import { UserAuth } from "../../Config/AuthContext";

import { FcGoogle } from "react-icons/fc";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { user, signIn, googleSignIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/authenticated/dashboard");
    } catch (error) {
      setError(error.message);
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
    <div className="container login_container">
      <div className="login_wrapper">
        <div className="login_grid">
          <div className="login_img">
            <div className="l_image"></div>
          </div>
          <div className="login_details">
            <div className="l_details_div">
              <form onSubmit={handleSubmit}>
                <h1>Welcome Back</h1>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="login_btn">
                  Log in
                </button>

                <div className="l_or_container">
                  <span className="l_or_text">Or</span>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="login_btn_secondary"
                >
                  <FcGoogle className="l_logo" /> Continue with Google
                </button>

                <small>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
