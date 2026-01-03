import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, signout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      {/* Left */}
      <Link to="/" className="text-xl font-bold">
        Evolyte
      </Link>

      {/* Right */}
      <div className="flex gap-4 items-center">
        <Link to="/">Courses</Link>

        {!token && (
          <>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/purchases">My Courses</Link>
            <button
              onClick={() => {
                signout();
                navigate("/");
              }}
              className="text-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
