import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminSignup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const { signin } = useAuth();
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await api.post("/admin/signup", form);
      signin(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Admin signup failed");
    }
  }

  return (
    <form
      onSubmit={handleSignup}
      className="max-w-md mx-auto p-6 mt-10 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Admin Sign Up</h2>

      {["firstName", "lastName", "email", "password"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          placeholder={field}
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ))}

      <button className="w-full bg-black text-white py-2">Sign Up</button>
    </form>
  );
}
