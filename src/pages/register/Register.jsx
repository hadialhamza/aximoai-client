import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  User,
  Image as ImageIcon,
  Mail,
  Lock,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "@/hooks/useAuth";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import useAxios from "@/hooks/useAxios";
import Input from "@/components/ui/input/Input";

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const { createUser, profileUpdate, googleLogin, user, loading } = useAuth();
  const axiosPublic = useAxios();
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

      // 3. Save user to database
      const userInfo = {
        name: name,
        email: email,
        photoURL: photoURL || "https://i.ibb.co.com/Fm6d0pP/user.png",
      };
      await axiosPublic.post("/users", userInfo);

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
      const result = await googleLogin();
      const user = result.user;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      await axiosPublic.post("/users", userInfo);

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
              badge="Create Account"
              icon={UserPlus}
              title={
                <span>
                  Join <span className="text-primary">AximoAI</span>
                </span>
              }
              description="Set up your account to publish, manage, and monetize your AI models in one place. Track performance, manage inventory, and stay ahead of the curve."
              align="left"
              className="items-start text-left mx-0 mb-0"
            />

            <div className="bg-white/90 dark:bg-slate-900/60 border border-primary/20 rounded-2xl p-5 shadow-lg shadow-primary/10">
              <p className="text-xs uppercase text-slate-500 dark:text-slate-400 tracking-wide mb-3">
                Why create an account?
              </p>
              <ul className="space-y-2 text-xs text-slate-700/90 dark:text-slate-200/90">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  Publish and organize your AI models in a clean inventory
                  interface.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  Explore marketplace listings and track performance metrics.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                  Secure login with password rules and Google authentication.
                </li>
              </ul>
            </div>

            {/* Community Snapshot */}
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 rounded-2xl p-5">
              <p className="text-xs uppercase text-primary dark:text-primary/90 tracking-wide mb-3 font-semibold">
                Community Snapshot
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    12k+
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Creators
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    8.5k+
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Models
                  </p>
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-50">
                    150+
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Countries
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-md bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl dark:shadow-2xl dark:shadow-primary/20"
          >
            <div className="mb-5">
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground">
                Create your account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                It only takes a minute to get started.
              </p>
            </div>

            {error && (
              <div className="mb-4 text-xs rounded-xl border border-red-400/50 bg-red-100/50 text-red-700 dark:border-red-500/50 dark:bg-red-500/10 dark:text-red-200 px-3 py-2">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 text-xs rounded-xl border border-primary/50 bg-emerald-100/50 text-emerald-700 dark:border-primary/50 dark:bg-primary/10 dark:text-primary px-3 py-2">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full name"
                type="text"
                name="name"
                id="name"
                icon={User}
                placeholder="Your name"
                required
              />

              <Input
                label={
                  <span>
                    Photo URL{" "}
                    <span className="text-slate-400 dark:text-slate-500">
                      (optional)
                    </span>
                  </span>
                }
                type="url"
                name="photoURL"
                id="photoURL"
                icon={ImageIcon}
                placeholder="https://example.com/avatar.jpg"
              />

              <Input
                label="Email address"
                type="email"
                name="email"
                id="email"
                icon={Mail}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />

              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  id="password"
                  icon={Lock}
                  placeholder="Enter Password"
                  required
                  autoComplete="new-password"
                />
                <p className="text-[10px] text-slate-500 dark:text-slate-500">
                  Must be at least 6 characters and include uppercase,
                  lowercase, number &amp; special character.
                </p>
              </div>

              <Input
                label="Confirm password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                icon={Lock}
                placeholder="••••••••"
                required
                autoComplete="new-password"
              />

              {/* Submit */}
              <MyBtn
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                className="mt-5 w-full"
                icon={ArrowRight}
              >
                Create account
              </MyBtn>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800/80" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                OR CONTINUE WITH
              </span>
              <div className="h-px flex-1 bg-slate-200/80 dark:bg-slate-800/80" />
            </div>

            {/* Google Signup */}
            <MyBtn
              type="button"
              variant="outline"
              icon={FcGoogle}
              iconPlacement="left"
              onClick={handleGoogleRegister}
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              <span>Sign up with Google</span>
            </MyBtn>

            {/* Login link */}
            <p className="mt-5 text-sm text-slate-600 dark:text-slate-400 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 underline underline-offset-4"
              >
                Login instead
              </Link>
            </p>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
