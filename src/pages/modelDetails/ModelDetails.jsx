import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  ListTree,
  Database,
  ArrowLeft,
  ShoppingCart,
  User,
  Clock,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useSecureAxios from "@/hooks/useSecureAxios";
import { toast } from "react-toastify";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import ModelDetailsSkeleton from "@/components/skeletons/ModelDetailsSkeleton";

const ModelDetails = () => {
  const { id } = useParams();
  const axiosSecure = useSecureAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    document.title = "Model Details | AximoAI";
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

  useEffect(() => {
    if (user?.email && id) {
      axiosSecure
        .get(`/my-purchases?email=${user.email}`)
        .then((res) => {
          const bought = res.data?.result?.some((p) => p.modelId === id);
          if (bought) setIsPurchased(true);
        })
        .catch((err) => console.error("Failed to check purchase status:", err));
    }
  }, [user, id, axiosSecure]);

  const handleGoBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/models");
    }
  };

  const handlePurchase = async () => {
    if (!user) {
      toast.info("Please login to purchase this model.", {
        icon: "🔐",
      });
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!model?._id) return;
    if (isPurchased) {
      toast.info("You have already purchased this model.");
      return;
    }

    setPurchasing(true);
    try {
      const payload = {
        modelId: model._id,
        modelName: model.name,
        price: model.price || 0,
        buyerEmail: user.email,
        buyerName: user.displayName,
        purchasedAt: new Date().toISOString(),
      };

      const { data } = await axiosSecure.post(
        `/models/${id}/purchase`,
        payload
      );
      console.log("purchase response:", data);

      toast.success("Model purchased successfully!");
      setIsPurchased(true);
      setModel((prev) =>
        prev ? { ...prev, purchased: (prev.purchased || 0) + 1 } : prev
      );
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
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">
        <Container>
          <ModelDetailsSkeleton />
        </Container>
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
          <MyBtn
            variant="white"
            onClick={handleGoBack}
            className="rounded-full border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 hover:border-emerald-400/70 hover:text-emerald-700 dark:hover:text-emerald-200"
            size="sm"
            icon={ArrowLeft}
            iconPlacement="left"
          >
            Back to all models
          </MyBtn>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">
      <Container>
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SectionHeading
              title="Model Insights"
              description="Explore technical specifications and deployment details."
              badge="Model Details"
            />
            <MyBtn
              variant="outline"
              onClick={handleGoBack}
              className="rounded-full border-slate-300 dark:border-slate-700/80 text-xs text-slate-800 dark:text-slate-200 hover:border-emerald-400/70 hover:text-emerald-700 dark:hover:text-emerald-200"
              size="sm"
              icon={ArrowLeft}
              iconPlacement="left"
            >
              Back to all models
            </MyBtn>
          </div>

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
                className="w-full h-full max-h-96 object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x500?text=Model+Image";
                }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[11px] inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 border border-emerald-500/40 text-emerald-200">
                <Cpu className="h-3.5 w-3.5" />
                <span>AximoAI Certified</span>
              </div>
            </div>

            {/* Info */}
            <div className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-xl dark:shadow-emerald-900/30 flex flex-col justify-between">
              <div>
                <div className="space-y-3 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
                    {model.name}
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    A high-performance AI model optimized for{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {model.useCase || "general tasks"}
                    </span>
                    . Integrates seamlessly with {model.framework} based
                    applications.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                        Framework
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                        {model.framework || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                      <ListTree className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                        Use Case
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                        {model.useCase || "General"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                        Dataset
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                        {model.dataset || "Custom"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                        Added By
                      </p>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                        {model.addedBy || "Admin"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 col-span-1 sm:col-span-2">
                    <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="w-full">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                        Stats
                      </p>
                      <div className="flex justify-between w-full">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
                          Added:{" "}
                          {model.createdAt
                            ? new Date(model.createdAt).toLocaleDateString()
                            : "Recent"}
                        </p>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {model.purchased || 0} Downloads
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase button */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 dark:text-slate-400 text-center sm:text-left">
                  <p>Ready to deploy?</p>
                  <p>Add this model to your workspace instantly.</p>
                </div>
                <MyBtn
                  type="button"
                  onClick={handlePurchase}
                  disabled={purchasing || isPurchased}
                  isLoading={purchasing}
                  className={`w-full sm:w-auto rounded-full px-6 py-2.5 text-sm font-medium transition-all shadow-lg ${
                    isPurchased
                      ? "bg-slate-200 text-slate-500 cursor-default shadow-none dark:bg-slate-800 dark:text-slate-500"
                      : "text-slate-950 shadow-emerald-900/40"
                  }`}
                  variant={isPurchased ? "ghost" : "primary"}
                  icon={ShoppingCart}
                  iconPlacement="left"
                >
                  {isPurchased ? "In Your Library" : "Purchase Model"}
                </MyBtn>
              </div>
            </div>
          </motion.div>

          {/* Description block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-xl dark:shadow-emerald-900/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-1 rounded-full bg-emerald-500" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Model Documentation
              </h2>
            </div>

            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
              <p className="whitespace-pre-line leading-relaxed">
                {model.description}
              </p>

              {!model.description && (
                <p className="italic text-slate-500">
                  No detailed documentation available for this model.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default ModelDetails;
