import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");
  }, [location.key]);

  useEffect(() => {
    if (isLocked) {
      const timer = setTimeout(() => {
        setIsLocked(false);
        setAttempts(0);
        setError("");
      }, 30000); // 30 seconds
      return () => clearTimeout(timer);
    }
  }, [isLocked]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (isLocked) {
      setError("Too many failed attempts. Please wait 30 seconds.");
      return;
    }

    if (username === "murali" && password === "0987") {
      navigate("/dropdown");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsLocked(true);
        setError("Too many failed attempts. Please wait 30 seconds.");
      } else {
        setError(`Invalid credentials. ${3 - newAttempts} attempt(s) left.`);
      }
    }
  };

  return (
    <div className="login-background d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLocked}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLocked}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={isLocked}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
