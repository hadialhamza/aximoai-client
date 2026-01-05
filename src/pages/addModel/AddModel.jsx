import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Cpu,
  Layers,
  ListTree,
  Database,
  FileText,
  Image as ImageIcon,
  Bot,
  Plus,
} from "lucide-react";
import useSecureAxios from "../../hooks/useSecureAxios";
import { toast } from "react-toastify";
import MyBtn from "@/components/ui/buttons/MyBtn";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import Input from "@/components/ui/input/Input";

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
    <div className="min-h-screen py-10 px-4">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <SectionHeading
            badge="Add New Model"
            icon={Bot}
            title={
              <span>
                Publish a model to <span className="text-primary">AximoAI</span>
              </span>
            }
            description="Describe your AI model with its framework, use case, and dataset so it can be organized and discovered in the marketplace."
            align="center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-3xl mx-auto bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl dark:shadow-2xl dark:shadow-primary/10"
        >
          <form onSubmit={handleAddModel} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Model Name"
                name="name"
                id="name"
                icon={Cpu}
                placeholder="e.g. VisionX-Classifier"
                required
              />

              <Input
                label="Framework"
                name="framework"
                id="framework"
                icon={Layers}
                placeholder="e.g. TensorFlow, PyTorch"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Use Case"
                name="useCase"
                id="useCase"
                icon={ListTree}
                placeholder="e.g. Image classification"
                required
              />

              <Input
                label="Dataset"
                name="dataset"
                id="dataset"
                icon={Database}
                placeholder="e.g. Custom hospital dataset"
                required
              />
            </div>

            <Input
              label="Image URL"
              name="image"
              id="image"
              type="url"
              icon={ImageIcon}
              placeholder="https://example.com/model-cover.png"
              required
            />

            <Input
              label="Description"
              name="description"
              id="description"
              icon={FileText}
              multiline
              rows={4}
              placeholder="Describe what this model does, its architecture, and any important notes for potential users."
              required
            />

            <div className="pt-2 flex justify-end">
              <MyBtn
                type="submit"
                variant="primary"
                isLoading={submitting}
                className="w-full sm:w-auto"
                icon={Plus}
              >
                Add Model
              </MyBtn>
            </div>
          </form>
        </motion.div>
      </Container>
    </div>
  );
};

export default AddModel;
