import { useEffect, useMemo, useState } from "react";
// eslint-disable-next-line no-unused-vars
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
} from "lucide-react";
import { Link } from "react-router";
import useSecureAxios from "../../../hooks/useSecureAxios";

const AllModels = () => {
  const axios = useSecureAxios();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [frameworkFilter, setFrameworkFilter] = useState("all");
  const [useCaseFilter, setUseCaseFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    document.title = "All Models | ModelMatrix AI";
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

  // useEffect(() => {
  //   const fetchModels = async () => {
  //     try {
  //       const { data } = await axios.get("/models");
  //       console.log(data.result);
  //       setModels(data?.result || []);
  //     } catch (err) {
  //       console.error("Failed to fetch models:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchModels();
  // }, [axios]);

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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-[11px] uppercase tracking-[0.18em] text-emerald-200 mb-3">
              <Cpu className="h-3 w-3" />
              Model Inventory
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
              Browse all <span className="text-emerald-400">AI models</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400 max-w-xl">
              Search, filter, and sort AI models by framework, use case, and
              dataset to find exactly what you need.
            </p>
          </div>

          <Link
            to="/add-model"
            className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 text-slate-950 text-sm font-medium px-5 py-2.5 shadow-lg shadow-emerald-900/40 hover:from-emerald-400 hover:to-emerald-300 transition-all"
          >
            + Add Model
          </Link>
        </motion.div>

        {/* Controls: search + filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-slate-950/80 border border-slate-800/80 rounded-3xl p-4 md:p-5 shadow-xl shadow-emerald-900/20 backdrop-blur"
        >
          <div className="grid md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
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
                  className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/80 pl-10 pr-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 transition-all"
                />
              </div>
            </div>

            {/* Framework filter */}
            <div>
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Framework
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <Layers className="h-4 w-4 text-slate-500" />
                </span>
                <select
                  value={frameworkFilter}
                  onChange={(e) => setFrameworkFilter(e.target.value)}
                  className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/80 pl-9 pr-8 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 appearance-none"
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
              <label className="block text-[11px] font-medium text-slate-300 mb-1">
                Use Case
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center">
                  <ListTree className="h-4 w-4 text-slate-500" />
                </span>
                <select
                  value={useCaseFilter}
                  onChange={(e) => setUseCaseFilter(e.target.value)}
                  className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/80 pl-9 pr-8 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 appearance-none"
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
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Database className="h-3.5 w-3.5" />
              <span>
                Showing{" "}
                <span className="text-emerald-300 font-semibold">
                  {filteredModels.length}
                </span>{" "}
                of{" "}
                <span className="text-slate-200 font-semibold">
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
                  className="rounded-full bg-slate-900/80 border border-slate-700/80 pl-9 pr-8 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 focus:border-emerald-500/80 appearance-none"
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
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-emerald-400/70 hover:text-emerald-200 transition-all"
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
              <span className="h-8 w-8 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
              <p className="text-sm text-slate-300">Loading models...</p>
            </div>
          </div>
        ) : filteredModels.length === 0 ? (
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-sm text-slate-300">
                No models matched your filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 px-4 py-1.5 text-xs text-slate-100 hover:border-emerald-400/70 hover:text-emerald-200 transition-all"
              >
                Reset filters
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredModels.map((model) => (
              <div
                key={model._id}
                className="group bg-slate-950/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg shadow-emerald-900/20 hover:border-emerald-400/60 hover:shadow-emerald-900/40 transition-all flex flex-col"
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
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-50 line-clamp-1">
                      {model.name}
                    </h2>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="truncate">
                        {model.framework || "Unknown framework"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ListTree className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="truncate">
                        {model.useCase || "General use case"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Database className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="truncate">
                        {model.dataset || "Dataset not specified"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 mt-1 flex-1">
                    {model.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      Added{" "}
                      {model.createdAt
                        ? new Date(model.createdAt).toLocaleDateString()
                        : "Recently"}
                    </span>
                    <Link
                      to={`/models/${model._id}`}
                      className="inline-flex items-center gap-1 text-emerald-300 hover:text-emerald-200"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllModels;
