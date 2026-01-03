import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useState } from "react";

export default function CreateCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    published: false,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/admin/course", { ...form, price: Number(form.price) });
      alert("course created successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "course create failed");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 mt-10 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Create Course</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full border p-2 mb-3"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Price"
        type="number"
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Image URL (optional)"
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          onChange={(e) =>
            setForm({
              ...form,
              published: e.target.checked,
            })
          }
        />
        Publish immediately
      </label>

      <button className="w-full bg-black text-white py-2">Create Course</button>
    </form>
  );
}
