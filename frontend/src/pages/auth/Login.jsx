import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import { useAuth } from "../../context/useAuth";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

  const { login } = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await login(formData);
    navigate("/dashboard");
  } catch (error) {
    console.error(
      error.response?.data?.message || error.message
    );
  }
};

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your account."
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email address
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={19} />

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg shadow-blue-600/20"
        >
          Sign in
        </button>

      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;