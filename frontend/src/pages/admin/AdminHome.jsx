import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="text-3xl font-bold">Evolyte Admin Portal</h1>

      <div className="flex gap-4">
        <Link
          to="/admin/signin"
          className="bg-black text-white px-6 py-3 rounded"
        >
          Admin Sign In
        </Link>

        <Link to="/admin/signup" className="border px-6 py-3 rounded">
          Admin Sign Up
        </Link>
      </div>
    </div>
  );
}
