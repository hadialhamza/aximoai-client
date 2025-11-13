import { useEffect, useState } from "react";
import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Cpu, Layers, ListTree, Database, Trash2, Pencil } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useSecureAxios from "../../../hooks/useSecureAxios";

const MyModels = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    document.title = "My Models | ModelMatrix AI";
  }, []);

  useEffect(() => {
    axiosSecure.get(`/my-models?email.=${user.email}`).then((res) => {
      console.log(res.data.result);
      setModels(res.data.result);
      setLoading(false);
    });
  }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will permanently delete the model.",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);

    try {
      const { data } = await axiosSecure.delete(`/models/${id}`);
      console.log("delete response:", data);

      const deleted =
        data?.deletedCount > 0 || data?.acknowledged || data?.success === true;

      if (deleted) {
        setModels((prev) => prev.filter((m) => m._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Model deleted successfully.",
          confirmButtonColor: "#22c55e",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to delete model.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete model.",
      });
    } finally {
      setDeletingId(null);
    }
  };

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
              <Cpu className="h-3 w-3" />
              My Models
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
              Manage your{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                published models
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              View, update, or delete the AI models you have added to
              ModelMatrix AI.
            </p>
          </div>

          <Link
            to="/add-model"
            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 text-sm font-medium px-5 py-2.5 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 transition-all"
          >
            + Add New Model
          </Link>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <span className="h-8 w-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Loading your models...
              </p>
            </div>
          </div>
        ) : models.length === 0 ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="text-center space-y-3">
              <p className="text-base text-slate-800 dark:text-slate-200">
                You haven&apos;t added any models yet.
              </p>
              <Link
                to="/add-model"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 text-sm font-medium px-4 py-2 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 transition-all"
              >
                + Add your first model
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 md:p-6 shadow-xl dark:shadow-xl dark:shadow-emerald-900/25 overflow-x-auto"
          >
            <table className="min-w-full text-sm text-left align-middle">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800/80">
                  <th className="py-3 pr-3 font-medium">Model</th>
                  <th className="py-3 pr-3 font-medium">Framework</th>
                  <th className="py-3 pr-3 font-medium">Use Case</th>
                  <th className="py-3 pr-3 font-medium hidden md:table-cell">
                    Dataset
                  </th>
                  <th className="py-3 pr-3 font-medium hidden md:table-cell">
                    Added On
                  </th>
                  <th className="py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr
                    key={model._id}
                    className="border-b border-slate-200/80 dark:border-slate-800/60 last:border-none hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    {/* Model name + tiny description */}
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:block w-12 h-12 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-900/80">
                          <img
                            src={model.image}
                            alt={model.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/80x80?text=Model";
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-slate-100 font-medium line-clamp-1">
                            {model.name}
                          </p>
                          <p className="text-[11px] text-slate-600 dark:text-slate-500 line-clamp-1">
                            {model.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Framework */}
                    <td className="py-3 pr-3 align-top">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                        <Layers className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate max-w-[120px] md:max-w-40">
                          {model.framework || "—"}
                        </span>
                      </div>
                    </td>

                    {/* Use case */}
                    <td className="py-3 pr-3 align-top">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                        <ListTree className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate max-w-[150px] md:max-w-[200px]">
                          {model.useCase || "—"}
                        </span>
                      </div>
                    </td>

                    {/* Dataset */}
                    <td className="py-3 pr-3 align-top hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                        <Database className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span className="truncate max-w-[180px]">
                          {model.dataset || "—"}
                        </span>
                      </div>
                    </td>

                    {/* Created date */}
                    <td className="py-3 pr-3 align-top hidden md:table-cell">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {model.createdAt
                          ? new Date(model.createdAt).toLocaleDateString()
                          : "—"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 pl-3 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/update-model/${model._id}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/70 text-emerald-700 dark:text-emerald-200 text-[11px] px-3 py-1.5 hover:bg-emerald-500/10 transition-all"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(model._id)}
                          disabled={deletingId === model._id}
                          className="inline-flex items-center gap-1.5 rounded-full border border-red-500/70 text-red-600 dark:text-red-300 text-[11px] px-3 py-1.5 hover:bg-red-500/10 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                        >
                          {deletingId === model._id ? (
                            <>
                              <span className="h-3 w-3 border-2 border-red-500/40 border-t-transparent rounded-full animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            <>
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyModels;
