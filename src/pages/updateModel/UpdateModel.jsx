import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import Swal from "sweetalert2";
import useSecureAxios from "@/hooks/useSecureAxios";

const UpdateModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useSecureAxios();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [model, setModel] = useState({
    name: "",
    framework: "",
    useCase: "",
    dataset: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    document.title = "Update Model | AximoAI";
  }, []);

  // Fetch current model details
  useEffect(() => {
    const fetchModel = async () => {
      try {
        const { data } = await axiosSecure.get(`/models/${id}`);
        const current = data?.result || data;

        if (!current) {
          Swal.fire({
            icon: "error",
            title: "Model not found",
            text: "We could not find this model.",
          });
        } else {
          setModel({
            name: current.name || "",
            framework: current.framework || "",
            useCase: current.useCase || "",
            dataset: current.dataset || "",
            image: current.image || "",
            description: current.description || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch model:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load model details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [axiosSecure, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModel((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { name, framework, useCase, dataset, image, description } = model;

    if (
      !name.trim() ||
      !framework.trim() ||
      !useCase.trim() ||
      !dataset.trim() ||
      !image.trim() ||
      !description.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in all fields before saving.",
      });
      setSaving(false);
      return;
    }

    const updatedModel = {
      name: name.trim(),
      framework: framework.trim(),
      useCase: useCase.trim(),
      dataset: dataset.trim(),
      image: image.trim(),
      description: description.trim(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // 🔧 change to .patch if your backend uses PATCH instead of PUT
      const { data } = await axiosSecure.put(`/models/${id}`, updatedModel);
      console.log("update response:", data);

      const updated =
        data?.modifiedCount > 0 || data?.acknowledged || data?.success === true;

      if (updated) {
        await Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Model updated successfully.",
          confirmButtonColor: "#22c55e",
        });
        navigate(`/models/${id}`, { replace: true });
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes",
          text: "No changes were made, or the update failed.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: err?.response?.data?.message || "Failed to update model.",
      });
    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/60 text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-200 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Edit Model
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
            Update your{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              AximoAI
            </span>{" "}
            entry
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Adjust the details of your AI model. Changes will be reflected on
            the details page and in the public catalog.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-2xl dark:shadow-emerald-900/30 backdrop-blur"
        >
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Row 1: Name + Framework */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
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
                    value={model.name}
                    onChange={handleChange}
                    placeholder="e.g. VisionX-Classifier"
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Framework */}
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
                    value={model.framework}
                    onChange={handleChange}
                    placeholder="e.g. TensorFlow, PyTorch"
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Use case + Dataset */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Use Case */}
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
                    value={model.useCase}
                    onChange={handleChange}
                    placeholder="e.g. Image classification for medical scans"
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Dataset */}
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
                    value={model.dataset}
                    onChange={handleChange}
                    placeholder="e.g. custom hospital dataset"
                    className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
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
                  value={model.image}
                  onChange={handleChange}
                  placeholder="https://example.com/model-cover.png"
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                  required
                />
              </div>
            </div>

            {/* Description */}
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
                  value={model.description}
                  onChange={handleChange}
                  placeholder="Describe what this model does, its architecture, and any important notes for potential users."
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all resize-none"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 text-sm font-medium px-6 py-2.5 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {saving ? (
                  <>
                    <span className="h-4 w-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>Save Changes</>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateModel;
