import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import {
  Bot,
  AlertTriangle,
  Home,
  ArrowLeft,
  Search,
  LogIn,
  Mail,
} from "lucide-react";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Logo from "@/components/shared/logo/Logo";

const ErrorPage = () => {
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  const float = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 relative overflow-hidden py-10">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl w-full bg-white/80 dark:bg-slate-950/60 border border-slate-200/50 dark:border-slate-800/50 rounded-3xl p-8 md:p-12 shadow-2xl dark:shadow-emerald-900/20 text-center relative z-10"
      >
        <motion.div
          variants={item}
          className="flex justify-center mb-8 scale-110"
        >
          <Logo />
        </motion.div>

        <motion.div variants={item} className="flex justify-center mb-6">
          <motion.div
            variants={float}
            animate="animate"
            className="relative group"
          >
            <div className="w-24 h-24 rounded-3xl bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 border border-white/50 dark:border-slate-700/50 shadow-lg flex items-center justify-center relative z-10">
              <Bot className="h-12 w-12 text-emerald-500 dark:text-emerald-400 drop-shadow-sm" />
            </div>
            {/* Back Glow */}
            <div className="absolute inset-0 bg-emerald-500/30 blur-xl rounded-3xl transform group-hover:scale-110 transition-transform duration-500" />

            {/* Alert Badge */}
            <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-lg z-20">
              <div className="w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          variants={item}
          className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-600 dark:text-emerald-400 mb-2"
        >
          404 Error
        </motion.p>

        <motion.h1
          variants={item}
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4 bg-clip-text bg-linear-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400"
        >
          Lost in Space?
        </motion.h1>

        <motion.p
          variants={item}
          className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto"
        >
          The page you are looking for seems to have drifted away. Here are some
          safe coordinates to get you back on track:
        </motion.p>

        {/* Helpful Links */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left"
        >
          <Link
            to="/models"
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Search className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Explore
              </p>
              <p className="text-[10px] text-slate-500">View all models</p>
            </div>
          </Link>

          <Link
            to="/login"
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <LogIn className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Sign In
              </p>
              <p className="text-[10px] text-slate-500">Access your account</p>
            </div>
          </Link>

          <Link
            to="/contact"
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Support
              </p>
              <p className="text-[10px] text-slate-500">Get help & info</p>
            </div>
          </Link>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MyBtn
            onClick={() => navigate(-1)}
            variant="outline"
            icon={ArrowLeft}
            iconPlacement="left"
            className="w-full sm:w-auto justify-center"
          >
            Go Back
          </MyBtn>

          <MyBtn
            onClick={() => navigate("/")}
            icon={Home}
            iconPlacement="left"
            className="w-full sm:w-auto justify-center shadow-lg shadow-emerald-500/25"
          >
            Return Home
          </MyBtn>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
