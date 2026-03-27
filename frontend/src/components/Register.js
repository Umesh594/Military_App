import { useState } from "react";
import API from "../services/api";

export default function Register({ setIsAuth, goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    base: ""
  });

  const register = async () => {
    try {
      await API.post("/auth/register", form);

      alert("User Registered! Now login.");
      goToLogin(); 
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <select
          className="border p-2 w-full mb-3"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="ADMIN">Admin</option>
          <option value="COMMANDER">Base Commander</option>
          <option value="LOGISTICS">Logistics Officer</option>
        </select>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Base"
          onChange={(e) => setForm({ ...form, base: e.target.value })}
        />

        <button
          className="bg-green-600 text-white w-full py-2 rounded"
          onClick={register}
        >
          Register
        </button>

        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={goToLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}