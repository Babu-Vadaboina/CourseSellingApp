import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    published: false,
  });

  useEffect(() => {
    api
      .get(`/courses/${id}`)
      .then((res) => {
        const c = res.data.course;
        setForm({
          title: c.title,
          description: c.description,
          price: c.price,
          imageUrl: c.imageUrl || "",
          published: c.published,
        });
      })
      .catch(() => alert("Failed to load course"));
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/admin/course/${id}`, {
        ...form,
        price: Number(form.price),
      });

      alert("Course updated");
      navigate("/admin/courses");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 mt-10 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

      <input
        className="w-full border p-2 mb-3"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full border p-2 mb-3"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 mb-3"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Image URL"
        value={form.imageUrl}
        onChange={(e) =>
          setForm({
            ...form,
            imageUrl: e.target.value,
          })
        }
      />

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) =>
            setForm({
              ...form,
              published: e.target.checked,
            })
          }
        />
        Published
      </label>

      <button className="w-full bg-black text-white py-2">Save Changes</button>
    </form>
  );
}
