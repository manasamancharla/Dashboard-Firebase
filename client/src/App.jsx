import { Routes, Route } from "react-router-dom";

import { AuthContextProvider } from "./Config/AuthContext";
import ProtectedRoute from "./Config/ProtectedRoute";

import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import Authenticated from "./Pages/Authenticated/Authenticated";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/authenticated/*"
            element={
              <ProtectedRoute>
                <Authenticated />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
