import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Filter,
  Layers,
  ListFilter,
  ListTree,
  Database,
  Search,
  ArrowUpDown,
  Plus,
} from "lucide-react";
import { Link } from "react-router";
import useSecureAxios from "../../hooks/useSecureAxios";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import MyBtn from "@/components/ui/buttons/MyBtn";

const AllModels = () => {
  const axios = useSecureAxios();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [frameworkFilter, setFrameworkFilter] = useState("all");
  const [useCaseFilter, setUseCaseFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    document.title = "All Models | AximoAI";
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/models")
      .then((res) => {
        setModels(res.data.result);
      })
      .catch((err) => {
        console.error("Failed to fetch models:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axios]);

  // Build filter lists based on loaded models
  const frameworkOptions = useMemo(() => {
    const set = new Set();
    models.forEach((m) => {
      if (m.framework) set.add(m.framework);
    });
    return Array.from(set);
  }, [models]);

  const useCaseOptions = useMemo(() => {
    const set = new Set();
    models.forEach((m) => {
      if (m.useCase) set.add(m.useCase);
    });
    return Array.from(set);
  }, [models]);

  // Apply search, filter, and sort
  const filteredModels = useMemo(() => {
    let result = [...models];

    const term = searchTerm.trim().toLowerCase();

    if (term) {
      result = result.filter((model) => {
        return (
          model.name?.toLowerCase().includes(term) ||
          model.framework?.toLowerCase().includes(term) ||
          model.useCase?.toLowerCase().includes(term) ||
          model.dataset?.toLowerCase().includes(term)
        );
      });
    }

    if (frameworkFilter !== "all") {
      result = result.filter((m) => m.framework === frameworkFilter);
    }

    if (useCaseFilter !== "all") {
      result = result.filter((m) => m.useCase === useCaseFilter);
    }

    // Sorting
    if (sortOption === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || b._id?.toString().slice(-8)) -
          new Date(a.createdAt || a._id?.toString().slice(-8))
      );
    } else if (sortOption === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt || a._id?.toString().slice(-8)) -
          new Date(b.createdAt || b._id?.toString().slice(-8))
      );
    } else if (sortOption === "name-asc") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortOption === "name-desc") {
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    return result;
  }, [models, searchTerm, frameworkFilter, useCaseFilter, sortOption]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFrameworkFilter("all");
    setUseCaseFilter("all");
    setSortOption("newest");
  };

  return (
    <div className="min-h-screen py-10">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <SectionHeading
            badge="Model Inventory"
            icon={Cpu}
            title={
              <span>
                Browse all <span className="text-primary">AI models</span>
              </span>
            }
            description="Search, filter, and sort AI models by framework, use case, and dataset to find exactly what you need."
            align="left"
            className="items-start text-left mx-0"
          />

          <Link to="/add-model">
            <MyBtn variant="primary" icon={Plus}>
              Add Model
            </MyBtn>
          </Link>
        </div>

        {/* Controls: search + filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 md:p-5 shadow-xl dark:shadow-xl dark:shadow-primary/20 backdrop-blur"
        >
          <div className="grid md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                Search
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <Search className="h-4 w-4 text-slate-500" />
                </span>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search by name, framework, use case, dataset..."
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80 transition-all"
                />
              </div>
            </div>

            {/* Framework filter */}
            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                Framework
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <Layers className="h-4 w-4 text-slate-500" />
                </span>
                <select
                  value={frameworkFilter}
                  onChange={(e) => setFrameworkFilter(e.target.value)}
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-9 pr-8 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80 appearance-none"
                >
                  <option value="all">All frameworks</option>
                  {frameworkOptions.map((fw) => (
                    <option key={fw} value={fw}>
                      {fw}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <ListFilter className="h-4 w-4 text-slate-500" />
                </span>
              </div>
            </div>

            {/* Use case filter */}
            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                Use Case
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <ListTree className="h-4 w-4 text-slate-500" />
                </span>
                <select
                  value={useCaseFilter}
                  onChange={(e) => setUseCaseFilter(e.target.value)}
                  className="w-full rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-9 pr-8 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80 appearance-none"
                >
                  <option value="all">All use cases</option>
                  {useCaseOptions.map((uc) => (
                    <option key={uc} value={uc}>
                      {uc}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <Filter className="h-4 w-4 text-slate-500" />
                </span>
              </div>
            </div>
          </div>

          {/* Sorting + clear */}
          <div className="mt-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
              <Database className="h-3.5 w-3.5" />
              <span>
                Showing{" "}
                <span className="text-primary dark:text-primary font-semibold">
                  {filteredModels.length}
                </span>{" "}
                of{" "}
                <span className="text-slate-900 dark:text-slate-200 font-semibold">
                  {models.length}
                </span>{" "}
                models
              </span>
            </div>

            <div className="flex items-center gap-3 justify-end">
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <ArrowUpDown className="h-4 w-4 text-slate-500" />
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="rounded-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-slate-700/80 pl-9 pr-8 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/80 focus:border-primary/80 appearance-none"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="oldest">Sort: Oldest</option>
                  <option value="name-asc">Sort: Name A–Z</option>
                  <option value="name-desc">Sort: Name Z–A</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-700/80 px-3 py-1.5 text-[11px] text-slate-700 dark:text-slate-200 hover:border-primary/70 hover:text-primary dark:hover:text-primary transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* Models grid */}
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <span className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Loading models...
              </p>
            </div>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                No models matched your filters.
              </p>
              <MyBtn
                variant="outline"
                onClick={handleClearFilters}
                className="text-xs h-8"
              >
                Reset filters
              </MyBtn>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8"
          >
            {filteredModels.map((model) => (
              <div
                key={model._id}
                className="group bg-white/95 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-md dark:shadow-lg dark:shadow-primary/20 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/40 transition-all flex flex-col"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/600x400?text=Model+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-1">
                      {model.name}
                    </h2>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-primary" />
                      <span className="truncate">
                        {model.framework || "Unknown framework"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ListTree className="h-3.5 w-3.5 text-primary" />
                      <span className="truncate">
                        {model.useCase || "General use case"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Database className="h-3.5 w-3.5 text-primary" />
                      <span className="truncate">
                        {model.dataset || "Dataset not specified"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mt-1 flex-1">
                    {model.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-500">
                    <span>
                      Added{" "}
                      {model.createdAt
                        ? new Date(model.createdAt).toLocaleDateString()
                        : "Recently"}
                    </span>
                    <Link
                      to={`/models/${model._id}`}
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default AllModels;
