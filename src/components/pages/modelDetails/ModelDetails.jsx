import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  ListTree,
  Database,
  Calendar,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";
import { toast } from "react-toastify";

const ModelDetails = () => {
  const { id } = useParams();
  //   const axiosPublic = useAxios();
  const axiosSecure = useSecureAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    document.title = "Model Details | ModelMatrix AI";
  }, []);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const { data } = await axiosSecure.get(`/models/${id}`);
        const single = data?.result || data;
        console.log(data.result);
        setModel(single);
      } catch (err) {
        console.error("Failed to fetch model:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [axiosSecure, id]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/models");
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      // not logged in → send to login and then back here
      toast.info("Please login to purchase this model.", {
        icon: "🔐",
      });
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!model?._id) return;

    setPurchasing(true);
    try {
      const payload = {
        modelId: model._id,
        modelName: model.name,
        price: model.price || 0, // if you have price later
        buyerEmail: user.email,
        buyerName: user.displayName,
        purchasedAt: new Date().toISOString(),
      };

      // adjust endpoint to your backend (/purchases, /orders, etc.)
      const { data } = await axiosSecure.post(
        `/models/${id}/purchase`,
        payload
      );
      console.log("purchase response:", data);

      toast.success("Model purchased successfully!");
      // later you can navigate to /my-purchase if you want:
      // navigate("/my-purchase");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.message || "Failed to purchase model. Try again."
      );
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Loading model details...
          </p>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-slate-800 dark:text-slate-200 text-base">
            Model not found.
          </p>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700/80 px-4 py-1.5 text-sm text-slate-800 dark:text-slate-100 hover:border-emerald-400/70 hover:text-emerald-700 dark:hover:text-emerald-200 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all models
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700/80 px-4 py-1.5 text-xs text-slate-800 dark:text-slate-200 hover:border-emerald-400/70 hover:text-emerald-700 dark:hover:text-emerald-200 transition-all mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all models
        </button>

        {/* Top section: image + key info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-6 items-stretch"
        >
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/80 shadow-xl dark:shadow-xl dark:shadow-emerald-900/30">
            <img
              src={model?.image}
              alt={model.name}
              className="w-full h-full max-h-80 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/800x500?text=Model+Image";
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-[11px] inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 border border-emerald-500/40 text-emerald-200">
              <Cpu className="h-3.5 w-3.5" />
              <span>ModelMatrix AI</span>
            </div>
          </div>

          {/* Info */}
          <div className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 md:p-6 shadow-xl dark:shadow-xl dark:shadow-emerald-900/30 flex flex-col">
            <div className="space-y-2 mb-4">
              <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {model.name}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                A curated AI model in the ModelMatrix AI inventory, ready for
                experimentation and integration.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-800 dark:text-slate-200">
              <div className="flex items-start gap-2">
                <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Framework
                  </p>
                  <p>{model.framework || "Not specified"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <ListTree className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Use Case
                  </p>
                  <p>{model.useCase || "General use case"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Database className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Dataset
                  </p>
                  <p>{model.dataset || "Dataset not specified"}</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Added On
                  </p>
                  <p>
                    {model.createdAt
                      ? new Date(model.createdAt).toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>
              </div>
            </div>

            {/* Purchase button */}
            <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800/70 flex items-center justify-between gap-3">
              <div className="text-xs text-slate-600 dark:text-slate-400">
                Purchase this model to move it into your{" "}
                <span className="text-emerald-600 dark:text-emerald-300 font-medium">
                  My Purchase
                </span>{" "}
                section.
              </div>
              <button
                type="button"
                onClick={handlePurchase}
                disabled={purchasing}
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 text-xs md:text-sm font-medium px-4 py-2 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {purchasing ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Purchase Model
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Description block */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-5 md:p-6 shadow-xl dark:shadow-xl dark:shadow-emerald-900/30"
        >
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
            Model Description
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
            {model.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ModelDetails;
