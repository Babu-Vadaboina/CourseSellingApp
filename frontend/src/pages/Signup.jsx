import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const { signin } = useAuth();
  const navigate = useNavigate();
  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const res = await api.post("/user/signup", form);
      signin(res.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("signup failed");
    }
  }
  return (
    <form
      onSubmit={handleSignUp}
      className="max-w-md mx-auto p-6 mt-10 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {["firstName", "lastName", "email", "password"].map((field) => (
        <input
          key={field}
          placeholder={field}
          type={field === "password" ? "password" : "text"}
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        />
      ))}
      <button className="w-full bg-black text-white py-2">Sign Up</button>
    </form>
  );
}
