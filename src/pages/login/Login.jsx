import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LayoutDashboard, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";

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
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <Container>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex h-full max-w-md flex-col justify-between gap-6 text-slate-900 dark:text-slate-100 bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-primary/20"
          >
            <SectionHeading
              badge="Secure Access"
              icon={LogIn}
              title={
                <span>
                  Welcome back to <span className="text-primary">AximoAI</span>
                </span>
              }
              description="Sign in to manage your AI models, track marketplace performance, and explore the latest additions to your model inventory."
              align="left"
              className="items-start text-left mx-0 mb-0"
            />

            <div className="bg-white/90 dark:bg-slate-900/60 border border-primary/20 rounded-2xl p-5 backdrop-blur-xl shadow-lg shadow-primary/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase text-slate-500 dark:text-slate-400 tracking-wide">
                    Dashboard Preview
                  </p>
                  <p className="text-sm text-slate-900 dark:text-slate-100 font-medium">
                    Inventory Snapshot
                  </p>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/15 border border-primary/40">
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300/80">
                  <span>Active Models</span>
                  <span className="font-semibold text-primary">42</span>
                </div>
                <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300/80">
                  <span>Marketplace Listings</span>
                  <span className="font-semibold text-primary">18</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-linear-to-r from-emerald-400 to-emerald-300" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 sm:py-10 shadow-xl dark:shadow-2xl dark:shadow-primary/20"
          >
            <div className="mb-5">
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground">
                Login to your account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Enter your credentials to access the dashboard.
              </p>
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
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80 transition-all"
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
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-10 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80 transition-all"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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

              {/* Forgot Password */}
              <div className="flex justify-end text-xs mt-1">
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 underline underline-offset-4"
                >
                  Forgot password?
                </button>
              </div>

              {/* Email/password submit */}
              <MyBtn
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                className="mt-2 w-full"
              >
                Sign in
              </MyBtn>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800/80" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800/80" />
            </div>

            {/* Google login */}
            <MyBtn
              type="button"
              variant="outline"
              icon={FcGoogle}
              iconPlacement="left"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              <span>Sign in with Google</span>
            </MyBtn>

            {/* Register link */}
            <p className="mt-5 text-sm text-slate-600 dark:text-slate-400 text-center">
              New to AximoAI?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
