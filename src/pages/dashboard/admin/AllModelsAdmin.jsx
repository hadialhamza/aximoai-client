import { useEffect, useState } from "react";
import useSecureAxios from "@/hooks/useSecureAxios";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import AllModelsAdminSkeleton from "@/components/skeletons/AllModelsAdminSkeleton";
import {
  Box,
  Trash2,
  Edit,
  Search,
  Filter,
  Cpu,
  ShoppingCart,
  Layers,
} from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";

const AllModelsAdmin = () => {
  const axiosSecure = useSecureAxios();
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Data
  const fetchModels = async () => {
    try {
      const res = await axiosSecure.get("/models");
      setModels(res.data.result || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [axiosSecure]);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Model?",
      text: "This action cannot be undone. The model will be removed permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red-500
      cancelButtonColor: "#3b82f6", // Blue-500
      confirmButtonText: "Yes, delete it!",
      background: "#fff",
      customClass: {
        popup: "rounded-xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/models/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Model has been removed.",
              icon: "success",
              confirmButtonColor: "#3b82f6",
            });
            fetchModels();
          }
        } catch (error) {
          Swal.fire(error, "Failed to delete model.");
        }
      }
    });
  };

  // Helper: Get Framework Color
  const getFrameworkStyle = (framework) => {
    const styles = {
      PyTorch: "bg-orange-100 text-orange-700 border-orange-200",
      TensorFlow: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Keras: "bg-red-100 text-red-700 border-red-200",
      ScikitLearn: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return styles[framework] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  // --- FIXED CALCULATION LOGIC ---

  // 1. Total Purchases Calculation
  const totalPurchases = models.reduce(
    (acc, curr) => acc + (curr.purchased || 0),
    0
  );

  // 2. Top Framework Calculation (FIXED: Added [...models] to avoid mutation)
  const topFramework =
    models.length > 0
      ? [...models] // Create a shallow copy before sorting/popping
        .sort(
          (a, b) =>
            models.filter((v) => v.framework === a.framework).length -
            models.filter((v) => v.framework === b.framework).length
        )
        .pop()?.framework
      : "N/A";

  // --- FIXED FILTER LOGIC ---
  const filteredModels = models.filter(
    (model) =>
      (model.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (model.framework || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <AllModelsAdminSkeleton />;
  }

  return (
    <Container className="max-w-full">
      {/* 1. Header Section */}
      <div className="mb-8">
        <SectionHeading
          title={
            <>
              Model <span className="text-primary">Inventory</span>
            </>
          }
          badge="Admin Dashboard"
          icon={Layers}
          description="Manage, track, and curate the AI models available on the platform."
          align="left"
        />
      </div>

      {/* 2. Stats Cards (Visual Summary) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-base-100 p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-lg">
            <Box size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Total Models</p>
            <h3 className="text-2xl font-bold text-base-content font-heading">
              {models.length}
            </h3>
          </div>
        </div>

        <div className="bg-base-100 p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-lg">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Total Sales</p>
            <h3 className="text-2xl font-bold text-base-content font-heading">
              {totalPurchases}
            </h3>
          </div>
        </div>

        <div className="bg-base-100 p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-lg">
            <Cpu size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Top Framework</p>
            <h3 className="text-2xl font-bold text-base-content font-heading">
              {topFramework}
            </h3>
          </div>
        </div>
      </div>

      {/* 3. Table Container */}
      <div className="bg-base-100 border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-4 w-4" />
            <input
              type="text"
              placeholder="Search models..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-base-100 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base-content transition-all placeholder:text-muted/70"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted bg-base-200 hover:bg-base-300 rounded-lg border border-border transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-200/50 border-b border-border text-xs uppercase tracking-wider text-muted font-semibold">
                <th className="px-6 py-4">Model Details</th>
                <th className="px-6 py-4">Framework</th>
                <th className="px-6 py-4">Creator</th>
                <th className="px-6 py-4">Popularity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredModels.length > 0 ? (
                filteredModels.map((model) => (
                  <tr
                    key={model._id}
                    className="group hover:bg-base-200/50 transition-colors"
                  >
                    {/* Model Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-base-200 border border-border overflow-hidden flex-shrink-0">
                          <img
                            src={model.image}
                            alt={model.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/150?text=AI";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-base-content">
                            {model.name}
                          </div>
                          <div className="text-xs text-muted flex items-center gap-1 mt-0.5">
                            <span className="bg-base-200 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide text-base-content/70">
                              {model.useCase || "General"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Framework */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getFrameworkStyle(
                          model.framework
                        )}`}
                      >
                        {model.framework}
                      </span>
                    </td>

                    {/* Creator */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-bold">
                          {model.createdBy?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-base-content">
                            {model.createdBy}
                          </span>
                          <span className="text-[10px] text-muted">
                            {model.createdAt
                              ? new Date(model.createdAt).toLocaleDateString()
                              : "Unknown"}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Popularity / Purchases */}
                    <td className="px-6 py-4">
                      <div className="w-24">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-base-content">
                            {model.purchased || 0} Sales
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-base-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{
                              width: `${Math.min(
                                (model.purchased || 0) * 10,
                                100
                              )}%`,
                            }} // Visual logic: 10 sales = 100%
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/dashboard/update-model/${model._id}`}
                          className="p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Edit Model"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(model._id)}
                          className="p-2 text-muted hover:text-error hover:bg-error/10 rounded-lg transition-all"
                          title="Delete Model"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Box className="h-8 w-8 opacity-20" />
                      <p>No models found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination Placeholder */}
        <div className="px-6 py-4 border-t border-border bg-base-200/30 flex justify-between items-center text-xs text-muted">
          <span>Showing {filteredModels.length} entries</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-border rounded hover:bg-base-100 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="px-3 py-1 border border-border rounded hover:bg-base-100 disabled:opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AllModelsAdmin;
