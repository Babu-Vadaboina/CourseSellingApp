import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../api/axios";

export default function CourseDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function handlePurchase() {
    try {
      // 1️⃣ Create order
      const res = await api.post("/user/purchase/order", {
        courseId: course._id,
      });

      const options = {
        key: res.data.razorpayKey,
        amount: res.data.amount,
        currency: res.data.currency,
        name: "Evolyte",
        description: course.title,
        order_id: res.data.orderId,
        handler: async function (response) {
          // 2️⃣ Verify payment
          await api.post("/user/purchase/verify", {
            ...response,
            courseId: course._id,
          });

          alert("Payment successful!");
          navigate("/purchases");
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("Payment failed");
    }
  }

  useEffect(() => {
    api
      .get(`/courses/${id}`)
      .then((res) => {
        setCourse(res.data.course);
        setLoading(false);
      })
      .catch(() => {
        setError("course not found");
        setLoading(false);
      });
  }, [id]);
  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>

      <p className="mt-4 text-gray-700">{course.description}</p>

      <p className="mt-6 text-2xl font-semibold">₹{course.price}</p>

      <button
        onClick={() => {
          if (!token) {
            navigate("/signin");
          } else {
            handlePurchase();
          }
        }}
        className="mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Buy Course
      </button>
    </div>
  );
}
