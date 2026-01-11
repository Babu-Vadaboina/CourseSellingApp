// ...existing code...
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {course.title}
          </h3>
          <span className="ml-3 text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            ₹{course.price}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {course.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/course/${course._id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            View Details
          </Link>

          <button
            className="bg-black text-white text-sm px-3 py-1 rounded hover:opacity-95"
            onClick={() => {
              // optional: trigger quick purchase or open details
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </article>
  );
}
// ...existing code...
