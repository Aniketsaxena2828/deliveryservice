import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
          "/users/login",
          formData
        );

        // SAVE TOKEN
        localStorage.setItem(
          "token",
          res.data.token
        );

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login Successful");

        navigate("/");
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          style={{
            padding: "10px",
            background: "black",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;