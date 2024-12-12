import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Context/AuthProvider";
import Home from "./Pages/Home/Home";
import Loading from "./Pages/Home/Components/Loading";

const App = () => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
