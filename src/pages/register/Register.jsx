import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  User,
  Image as ImageIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import MyBtn from "@/components/ui/buttons/MyBtn";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { createUser, profileUpdate, googleLogin, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "Register | AximoAI";
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, from, navigate]);

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one digit.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLocalLoading(true);

    const form = e.target;
    const name = form.name.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      setLocalLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setLocalLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLocalLoading(false);
      return;
    }

    try {
      // 1. Create user
      await createUser(email, password);

      // 2. Update profile
      if (profileUpdate) {
        await profileUpdate({
          displayName: name,
          photoURL: photoURL || undefined,
        });
      }

      setSuccess("Account created successfully! Redirecting...");
      form.reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      let message =
        err?.message || "Failed to create account. Please try again.";
      setError(message);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setSuccess("");
    setLocalLoading(true);

    try {
      await googleLogin();
      setSuccess("Signed up with Google successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Google sign-up failed. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  const isSubmitting = localLoading || loading;

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950 flex items-center justify-center px-4 py-8">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col gap-6 text-slate-900 dark:text-slate-100"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100/60 border border-emerald-300/40 dark:bg-emerald-500/10 dark:border-emerald-500/40 rounded-full px-3 py-1 w-fit text-xs uppercase tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Create Account
          </div>

          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
            Join{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Aximo
              <span className="text-emerald-500 dark:text-emerald-300">AI</span>
            </span>
          </h1>
          <p className="text-sm text-slate-700 dark:text-slate-300/80 max-w-md">
            Set up your account to publish, manage, and monetize your AI models
            in one place. Track performance, manage inventory, and stay ahead of
            the curve.
          </p>

          <div className="bg-white/60 dark:bg-slate-900/60 border border-emerald-300/25 dark:border-emerald-500/25 rounded-2xl p-5 backdrop-blur-xl shadow-lg shadow-emerald-300/40 dark:shadow-emerald-900/40">
            <p className="text-xs uppercase text-slate-500 dark:text-slate-400 tracking-wide mb-3">
              Why create an account?
            </p>
            <ul className="space-y-2 text-xs text-slate-700/90 dark:text-slate-200/90">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                Publish and organize your AI models in a clean inventory
                interface.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                Explore marketplace listings and track performance metrics.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                Secure login with password rules and Google authentication.
              </li>
            </ul>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200 underline underline-offset-4"
            >
              Login instead
            </Link>
          </p>
        </motion.div>

        {/* Right side: form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-emerald-300/50 dark:shadow-emerald-900/50"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Create your account
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                It only takes a minute to get started.
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end text-right">
              <p className="text-[10px] uppercase text-slate-400 dark:text-slate-500 tracking-[0.22em]">
                AximoAI
              </p>
              <span className="text-xs text-emerald-600/90 dark:text-emerald-400/90">
                Inventory &amp; Marketplace
              </span>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-xs rounded-xl border border-red-400/50 bg-red-100/50 text-red-700 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-200 px-3 py-2">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 text-xs rounded-xl border border-emerald-400/50 bg-emerald-100/50 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-200 px-3 py-2">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                Full name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <User className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                  required
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="space-y-1.5">
              <label
                htmlFor="photoURL"
                className="text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                Photo URL{" "}
                <span className="text-slate-400 dark:text-slate-500">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <ImageIcon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  id="photoURL"
                  name="photoURL"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                />
              </div>
            </div>

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
                  <Mail className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
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
                  <Lock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-1">
                Must be at least 6 characters and include uppercase, lowercase,
                number &amp; special character.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                Confirm password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <Lock className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                </span>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/80 pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-[11px] mt-1">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-0.5 h-3.5 w-3.5 rounded border-slate-400/80 bg-white/80 dark:border-slate-600/80 dark:bg-slate-900/80 text-emerald-500 focus:ring-emerald-500"
              />
              <label
                htmlFor="terms"
                className="text-slate-600/90 dark:text-slate-300/99"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200 underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200 underline"
                >
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit */}
            <MyBtn
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="mt-2 w-full"
              icon={ArrowRight}
            >
              Create account
            </MyBtn>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800/80" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800/80" />
          </div>

          {/* Google Signup */}
          <MyBtn
            type="button"
            variant="white"
            onClick={handleGoogleRegister}
            disabled={isSubmitting}
            className="w-full gap-2"
          >
            <span className="h-5 w-5 rounded-full bg-white flex items-center justify-center text-xs font-bold text-[#4285F4]">
              G
            </span>
            <span>Sign up with Google</span>
          </MyBtn>

          {/* Login link (for mobile) */}
          <p className="mt-5 text-[11px] text-slate-500 dark:text-slate-400 text-center md:hidden">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-300 dark:hover:text-emerald-200 underline underline-offset-4"
            >
              Login instead
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
