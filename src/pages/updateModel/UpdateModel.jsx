import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  ListTree,
  Database,
  FileText,
  Image as ImageIcon,
  Save,
  Edit,
} from "lucide-react";
import Swal from "sweetalert2";
import useSecureAxios from "@/hooks/useSecureAxios";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Input from "@/components/ui/input/Input";
import UpdateModelSkeleton from "@/components/skeletons/UpdateModelSkeleton";

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
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <UpdateModelSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Edit Model"
          icon={Edit}
          title={
            <span>
              Update your <span className="text-primary">AximoAI</span> entry
            </span>
          }
          description="Adjust the details of your AI model. Changes will be reflected on the details page and in the public catalog."
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-2xl dark:shadow-emerald-900/30 backdrop-blur-md"
        >
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Model Name"
                name="name"
                value={model.name}
                onChange={handleChange}
                placeholder="e.g. VisionX-Classifier"
                icon={Cpu}
                required
              />
              <Input
                label="Framework"
                name="framework"
                value={model.framework}
                onChange={handleChange}
                placeholder="e.g. TensorFlow, PyTorch"
                icon={Layers}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Use Case"
                name="useCase"
                value={model.useCase}
                onChange={handleChange}
                placeholder="e.g. Image classification"
                icon={ListTree}
                required
              />
              <Input
                label="Dataset"
                name="dataset"
                value={model.dataset}
                onChange={handleChange}
                placeholder="e.g. Custom hospital dataset"
                icon={Database}
                required
              />
            </div>

            <Input
              label="Image URL"
              name="image"
              type="url"
              value={model.image}
              onChange={handleChange}
              placeholder="https://example.com/model-cover.png"
              icon={ImageIcon}
              required
            />

            <Input
              label="Description"
              name="description"
              value={model.description}
              onChange={handleChange}
              placeholder="Describe what this model does..."
              multiline
              rows={4}
              icon={FileText}
              required
            />

            <div className="pt-4 flex justify-end">
              <MyBtn
                type="submit"
                disabled={saving}
                isLoading={saving}
                className="w-full sm:w-auto min-w-40 justify-center shadow-lg shadow-emerald-500/20"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </MyBtn>
            </div>
          </form>
        </motion.div>
      </Container>
    </div>
  );
};

export default UpdateModel;
