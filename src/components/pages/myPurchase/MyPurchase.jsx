import { useEffect, useState } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Cpu, Layers, ListTree, UserCircle2, ShoppingBag } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";

const MyPurchase = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const [purchases, setPurchases] = useState([]);
  console.log(purchases);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Purchases | ModelMatrix AI";
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`/my-purchases?email=${user?.email}`)
      .then((res) => {
        console.log(res.data.result);
        setPurchases(res.data?.result || []);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load your purchased models.",
          err,
        });
      })
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/60 text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200 mb-3">
              <ShoppingBag className="h-3 w-3" />
              My Purchases
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
              Models you&apos;ve{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                added to your toolkit
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Browse all AI models you have purchased on ModelMatrix AI and jump
              back into their details anytime.
            </p>
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <span className="h-8 w-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Loading your purchased models...
              </p>
            </div>
          </div>
        ) : purchases.length === 0 ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="text-center space-y-3">
              <p className="text-base text-slate-800 dark:text-slate-200">
                You haven&apos;t purchased any models yet.
              </p>
              <Link
                to="/all-models"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 text-sm font-medium px-4 py-2 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 transition-all"
              >
                <Cpu className="h-4 w-4" />
                Browse models
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {purchases.map((purchase) => {
              const {
                modelId,
                modelName,
                framework,
                useCase,
                image,
                createdBy,
                purchasedBy,
              } = purchase;

              return (
                <div
                  key={purchase._id}
                  className="group bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md dark:shadow-lg dark:shadow-emerald-900/20 hover:border-emerald-400/60 hover:shadow-lg hover:shadow-emerald-900/40 transition-all flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/600x400?text=Model+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-emerald-500/50 text-[10px] text-emerald-200">
                      <ShoppingBag className="h-3 w-3" />
                      Purchased
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-1">
                      {modelName}
                    </h2>

                    <div className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate">
                          {framework || "Unknown framework"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ListTree className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate">{useCase}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/70 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <UserCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate">
                          <span className="text-slate-800 dark:text-slate-300">
                            Created by:
                          </span>{" "}
                          {createdBy}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UserCircle2 className="h-3.5 w-3.5 text-sky-500" />
                        <span className="truncate">
                          <span className="text-slate-800 dark:text-slate-300">
                            Purchased by:
                          </span>{" "}
                          {purchasedBy}
                        </span>
                      </div>
                    </div>

                    {/* View details */}
                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 dark:text-slate-500">
                        ID:{" "}
                        <span className="text-slate-700 dark:text-slate-400">
                          {String(modelId || "").slice(-6) || "N/A"}
                        </span>
                      </span>

                      <Link
                        to={`/models/${modelId}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-emerald-500/70 px-3 py-1.5 text-[11px] text-emerald-200 hover:bg-emerald-500/10 transition-all"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyPurchase;
