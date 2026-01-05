import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Cpu, Layers, ListTree, UserCircle2, ShoppingBag } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "@/hooks/useAuth";
import useSecureAxios from "@/hooks/useSecureAxios";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import MyBtn from "@/components/ui/buttons/MyBtn";
import MyPurchaseSkeleton from "@/components/skeletons/MyPurchaseSkeleton";

const MyPurchase = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Purchases | AximoAI";
  }, []);

  useEffect(() => {
    axiosSecure
      .get(`/my-purchases?email=${user?.email}`)
      .then((res) => {
        console.log(res.data.result);
        setPurchases(res.data?.result || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load purchases:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load your purchased models.",
        });
        setLoading(false);
      });
  }, [user, axiosSecure]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10">
      <Container>
        {/* Header */}
        <SectionHeading
          badge="My Purchases"
          icon={ShoppingBag}
          title={
            <span>
              Models you&apos;ve{" "}
              <span className="text-primary">added to your toolkit</span>
            </span>
          }
          description="Browse all AI models you have purchased on AximoAI and jump back into their details anytime."
          align="left"
          className="md:mx-0 items-start mx-0 mb-10"
        />

        {/* Content */}
        {loading ? (
          <MyPurchaseSkeleton />
        ) : purchases.length === 0 ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <p className="text-lg text-slate-800 dark:text-slate-200 font-medium">
                You haven&apos;t purchased any models yet.
              </p>
              <Link to="/models">
                <MyBtn className="shadow-lg shadow-primary/25 gap-2">
                  <Cpu className="h-4 w-4" />
                  Browse models
                </MyBtn>
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
                  className="group bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md dark:shadow-lg dark:shadow-emerald-900/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all flex flex-col"
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
                        <Layers className="h-3.5 w-3.5 text-primary" />
                        <span className="truncate">
                          {framework || "Unknown framework"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ListTree className="h-3.5 w-3.5 text-primary" />
                        <span className="truncate">{useCase}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800/70 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <UserCircle2 className="h-3.5 w-3.5 text-primary" />
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
                    <div className="pt-2 flex justify-between items-center mt-auto">
                      <span className="text-[10px] text-slate-500 dark:text-slate-500">
                        ID:{" "}
                        <span className="text-slate-700 dark:text-slate-400">
                          {String(modelId || "").slice(-6) || "N/A"}
                        </span>
                      </span>

                      {modelId ? (
                        <Link to={`/models/${modelId}`}>
                          <MyBtn
                            variant="outline"
                            className="h-auto py-1.5 px-3 text-[11px] border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500"
                          >
                            View Details →
                          </MyBtn>
                        </Link>
                      ) : (
                        <span className="text-[11px] text-slate-500">
                          Details unavailable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default MyPurchase;
