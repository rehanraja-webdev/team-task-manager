import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import SEO from "../components/SEO";

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(formData);
    navigate("/dashboard");
  };

  return (
    <>
      <SEO
        title="Create Account | TeamTask"
        description="Create your free TeamTask account and start managing projects and tasks."
        path="/register"
      />

      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>

            <p className="text-slate-400 mt-2">
              Start managing projects with TeamTask
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm text-slate-300 mb-2"
              >
                Full Name
              </label>

              <input
                id="fullname"
                name="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={loading}
                autoComplete="name"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-slate-300 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={loading}
                autoComplete="email"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-slate-300 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                disabled={loading}
                autoComplete="new-password"
                minLength={6}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition rounded-lg py-3 text-white font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 hover:text-indigo-300 transition"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
