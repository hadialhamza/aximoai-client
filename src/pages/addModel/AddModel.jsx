import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  ListTree,
  Database,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { toast } from "react-toastify";

const AddModel = () => {
  const [submitting, setSubmitting] = useState(false);
  const axiosSecure = useSecureAxios();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Add Model | AximoAI";
  }, []);

  const handleAddModel = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;
    const name = form.name.value.trim();
    const framework = form.framework.value.trim();
    const useCase = form.useCase.value.trim();
    const dataset = form.dataset.value.trim();
    const description = form.description.value.trim();
    const image = form.image.value.trim();

    if (!name || !framework || !useCase || !dataset || !description || !image) {
      toast.error("Please fill in all fields.");
      setSubmitting(false);
      return;
    }

    const newModel = {
      name,
      framework,
      useCase,
      dataset,
      description,
      image,
      createdAt: new Date().toISOString(),
    };

    try {
      const { data } = await axiosSecure.post("/models", newModel);

      if (data?.result?.insertedId) {
        console.log(data);
        toast.success("Model added successfully!");

        form.reset();
        navigate("/models", { replace: true });
      } else {
        toast.error("Failed to add model. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/60 text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            Add New Model
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
            Publish a model to{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              AximoAI
            </span>
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Describe your AI model with its framework, use case, and dataset so
            it can be organized and discovered in the marketplace.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-2xl dark:shadow-emerald-900/30 backdrop-blur"
        >
          <form onSubmit={handleAddModel} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  Model Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <Cpu className="h-4 w-4 text-slate-500" />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="e.g. VisionX-Classifier"
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="framework"
                  className="text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  Framework
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <Layers className="h-4 w-4 text-slate-500" />
                  </span>
                  <input
                    id="framework"
                    name="framework"
                    type="text"
                    placeholder="e.g. TensorFlow, PyTorch"
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="useCase"
                  className="text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  Use Case
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <ListTree className="h-4 w-4 text-slate-500" />
                  </span>
                  <input
                    id="useCase"
                    name="useCase"
                    type="text"
                    placeholder="e.g. Image classification for medical scans"
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="dataset"
                  className="text-xs font-medium text-slate-800 dark:text-slate-200"
                >
                  Dataset
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <Database className="h-4 w-4 text-slate-500" />
                  </span>
                  <input
                    id="dataset"
                    name="dataset"
                    type="text"
                    placeholder="e.g. Custom hospital dataset"
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="image"
                className="text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                Image URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <ImageIcon className="h-4 w-4 text-slate-500" />
                </span>
                <input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/model-cover.png"
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                Description
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3">
                  <FileText className="h-4 w-4 text-slate-500" />
                </span>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe what this model does, its architecture, and any important notes for potential users."
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all resize-none"
                  required
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 text-sm font-medium px-6 py-2.5 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                    Adding model...
                  </>
                ) : (
                  <>Add Model</>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddModel;
