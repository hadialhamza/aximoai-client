import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Mail, Lock, LayoutDashboard, LogIn, Shield, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import Input from "@/components/ui/input/Input";
import useAxios from "@/hooks/useAxios";

const Login = () => {
  const [error, setError] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  // State for inputs to handle auto-fill
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { emailLogin, googleLogin, user, loading } = useAuth();
  const axiosPublic = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    document.title = "Login | AximoAI";
  }, []);

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, from, navigate]);

  // --- Auto-Fill Credentials Function ---
  const fillCredentials = (role) => {
    if (role === "admin") {
      setEmail("hamzaglory@gmail.com");
      setPassword("Abc@123");
    } else {
      setEmail("hamzaivac@gmail.com");
      setPassword("Abc@123");
    }
    setError(""); // Clear any previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLocalLoading(true);

    if (!email || !password) {
      setError("Please fill in both email and password.");
      setLocalLoading(false);
      return;
    }

    try {
      await emailLogin(email, password);
      // Navigation happens in useEffect when user state changes
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
      const result = await googleLogin();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      await axiosPublic.post("/users", userInfo);

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
          {/* Left side: Intro & Dashboard Preview */}
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

            <div className="bg-white/90 dark:bg-slate-900/60 border border-primary/20 rounded-2xl p-5 shadow-lg shadow-primary/10">
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

          {/* Right side: Login Form */}
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

            {/* --- Demo Credentials Box --- */}
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
                Quick Demo Access
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => fillCredentials("admin")}
                  className="flex flex-col items-center justify-center py-3 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <Shield className="w-5 h-5 text-primary mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Admin Demo
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => fillCredentials("user")}
                  className="flex flex-col items-center justify-center py-3 px-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                >
                  <User className="w-5 h-5 text-emerald-500 mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    User Demo
                  </span>
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-xs rounded-xl border border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-200 px-3 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                name="email"
                id="email"
                icon={Mail}
                placeholder="you@example.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                id="password"
                icon={Lock}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

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
