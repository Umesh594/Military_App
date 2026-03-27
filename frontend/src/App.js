import { useState } from "react";
import Dashboard from "./components/Dashboard";
import { Purchases } from "./components/Purchases";
import { Transfers } from "./components/Transfers";
import { Assignments } from "./components/Assignments";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
export default function App() {
const [page, setPage] = useState("dashboard");
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [authPage, setAuthPage] = useState("login");

 
  if (!isAuth) {
    return authPage === "login" ? (
      <Login
        setIsAuth={setIsAuth}
        goToRegister={() => setAuthPage("register")}
      />
    ) : (
      <Register
        setIsAuth={setIsAuth}
        goToLogin={() => setAuthPage("login")}
      />
    );
  }

  return (
    <div className="flex">
      <Sidebar setPage={setPage} />
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Navbar />
        {page === "dashboard" && <Dashboard />}
        {page === "purchases" && <Purchases />}
        {page === "transfers" && <Transfers />}
        {page === "assignments" && <Assignments />}
      </div>
    </div>
  );
}