import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-bold">{course.title}</h2>
      <p className="mt-2">{course.description}</p>
      <p className="mt-4 font-semibold">₹{course.price}</p>

      <Link
        to={`/course/${course._id}`}
        className="inline-block mt-4 text-blue-600"
      >
        View Details
      </Link>
    </div>
  );
}
