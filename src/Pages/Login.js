import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./../Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", res.data.token); // store JWT
      navigate("/"); // navigate to home page
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          required
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button className="loginButton" type="submit">
          Submit
        </button>
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#6a11cb", textDecoration: "underline" }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
