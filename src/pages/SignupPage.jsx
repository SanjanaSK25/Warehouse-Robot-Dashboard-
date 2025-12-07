import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/global.css";

function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";

    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email";

    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 4)
      err.password = "Min 4 characters";

    if (form.confirmPassword !== form.password)
      err.confirmPassword = "Passwords do not match";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulated signup success
      alert("Signup successful! Please login.");
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}

          <button type="submit" className="login-btn">
            Sign Up
          </button>

          <p className="signup-text">
            Already have an account?{" "}
            <Link to="/">
              <span>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
