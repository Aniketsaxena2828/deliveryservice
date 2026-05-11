import { Link } from "react-router-dom";

function Navbar() {
  const userData = localStorage.getItem("user");

  const user = userData
    ? JSON.parse(userData)
    : null;

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        background: "#111",
        color: "white",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>FoodExpress</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link style={{ color: "white" }} to="/">
          Home
        </Link>

        <Link
          style={{ color: "white" }}
          to="/cart"
        >
          Cart
        </Link>

        <Link
          style={{ color: "white" }}
          to="/orders"
        >
          Orders
        </Link>

        {user ? (
          <>
            <span>{user.name}</span>

            {user.role === "admin" && (
              <Link
                style={{ color: "white" }}
                to="/admin"
              >
                Admin
              </Link>
            )}

            <button onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              style={{ color: "white" }}
              to="/login"
            >
              Login
            </Link>

            <Link
              style={{ color: "white" }}
              to="/signup"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;