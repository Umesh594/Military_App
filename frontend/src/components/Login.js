import { useState } from "react";
import API from "../services/api";

export default function Login({ setIsAuth, goToRegister}) {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);

      
      localStorage.setItem("token", res.data.token);

      setIsAuth(true);
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white w-full py-2 rounded"
          onClick={login}
        >
          Login
        </button>
      </div>
      <p className="mt-3 text-sm text-center">
  Don't have an account?{" "}
  <span
    className="text-blue-600 cursor-pointer"
    onClick={goToRegister}
  >
    Register
  </span>
</p>
    </div>
  );
}