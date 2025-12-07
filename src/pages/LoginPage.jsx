import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import "../styles/global.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      err.email = "Enter valid email";

    if (!password) err.password = "Password is required";
    else if (password.length < 4)
      err.password = "Min 4 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginSuccess({ email }));
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome</h1>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="forgot">Forgot password?</div>

          <button type="submit" className="login-btn">
            Log in
          </button>

          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span>Sign up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
