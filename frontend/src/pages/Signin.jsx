import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();
    try {
      const res = await api.post("/user/signin", {
        email,
        password,
      });
      signin(res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  }

  return (
    <form
      onSubmit={handleSignin}
      className="max-w-md mx-auto p-6 mt-10 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-black text-white py-2">Sign In</button>
    </form>
  );
}
