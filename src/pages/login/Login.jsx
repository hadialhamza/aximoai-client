import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LayoutDashboard } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { emailLogin, googleLogin, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Login | AximoAI";
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLocalLoading(true);

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      setError("Please fill in both email and password.");
      setLocalLoading(false);
      return;
    }

    try {
      await emailLogin(email, password);
    } catch (err) {
      console.error(err);
      let message = err?.message || "Failed to sign in. Please try again.";
      if (err?.code === "auth/invalid-credential") {
        message = "Invalid email or password.";
      } else if (err?.code === "auth/user-not-found") {
        message = "No account found with this email.";
      } else if (err?.code === "auth/wrong-password") {
        message = "Incorrect password. Please try again.";
      }
      setError(message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLocalLoading(true);
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  const isSubmitting = localLoading || loading;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-emerald-900 dark:via-slate-950 dark:to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="section-container w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col gap-6 text-slate-900 dark:text-slate-100"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/50 rounded-full px-3 py-1 w-fit text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Secure Access
          </div>

          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
            Welcome back to{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              AximoAI
            </span>
          </h1>
          <p className="text-sm text-slate-600/90 dark:text-slate-300/80 max-w-md">
            Sign in to manage your AI models, track marketplace performance, and
            explore the latest additions to your model inventory.
          </p>

          <div className="bg-white/90 dark:bg-slate-900/60 border border-emerald-500/20 rounded-2xl p-5 backdrop-blur-xl shadow-lg shadow-emerald-900/40">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase text-slate-500 dark:text-slate-400 tracking-wide">
                  Dashboard Preview
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-100 font-medium">
                  Inventory Snapshot
                </p>
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/40">
                <LayoutDashboard className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300/80">
                <span>Active Models</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  42
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300/80">
                <span>Marketplace Listings</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  18
                </span>
              </div>
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-linear-to-r from-emerald-400 to-emerald-300" />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            New here?{" "}
            <Link
              to="/register"
              className="text-emerald-600 dark:text-emerald-300 hover:text-emerald-500 dark:hover:text-emerald-200 underline underline-offset-4"
            >
              Create an account instead
            </Link>
          </p>
        </motion.div>

        {/* Right side: Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/95 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-emerald-900/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Login to your account
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Enter your credentials to access the dashboard.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end text-right">
              <p className="text-[10px] uppercase text-slate-500 tracking-[0.22em]">
                AximoAI
              </p>
              <span className="text-xs text-emerald-600/90 dark:text-emerald-400/90">
                Inventory &amp; Marketplace
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-xs rounded-xl border border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-200 px-3 py-2">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <Mail className="h-4 w-4 text-slate-500" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <Lock className="h-4 w-4 text-slate-500" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>{" "}
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs mt-1">
              <label className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300/90">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-400 dark:border-slate-600/80 bg-white dark:bg-slate-900/80 text-emerald-500 focus:ring-emerald-500"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-emerald-600 dark:text-emerald-300 hover:text-emerald-500 dark:hover:text-emerald-200 underline underline-offset-4"
              >
                Forgot password?
              </button>
            </div>

            {/* Email/password submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 font-medium text-sm py-2.5 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>Sign in</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800/80" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800/80" />
          </div>

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 text-sm py-2.5 hover:border-emerald-400/70 hover:bg-emerald-50 dark:hover:bg-slate-900/80 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#4285F4]">
              G
            </span>
            <span>Sign in with Google</span>
          </button>

          {/* Register link (for mobile) */}
          <p className="mt-5 text-[11px] text-slate-600 dark:text-slate-400 text-center md:hidden">
            New to AximoAI?{" "}
            <Link
              to="/register"
              className="text-emerald-600 dark:text-emerald-300 hover:text-emerald-500 dark:hover:text-emerald-200 underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
