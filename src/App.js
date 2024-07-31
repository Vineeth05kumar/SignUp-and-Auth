import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "./components/store/auth-context";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
        <Route
          path="/profile"
          element={authCtx.isLoggedIn ? <UserProfile /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;
