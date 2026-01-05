import React, { useEffect, useState } from "react";
import useSecureAxios from "@/hooks/useSecureAxios";
import useAuth from "@/hooks/useAuth";
import Container from "@/components/ui/container/Container";
import PageLoader from "@/components/ui/loading/PageLoader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Package, ShoppingBag, Layers, Activity } from "lucide-react";
import { Link } from "react-router";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useSecureAxios();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalModels: 0,
    totalPurchases: 0,
    topFramework: "N/A",
  });
  const [chartData, setChartData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [modelsRes, purchasesRes] = await Promise.all([
          axiosSecure.get("/my-models"),
          axiosSecure.get("/my-purchases"),
        ]);

        const models = modelsRes.data.result || [];
        const purchases = purchasesRes.data.result || [];

        // Calculate Stats
        const frameworkCounts = {};
        models.forEach((model) => {
          const fw = model.framework || "Others";
          frameworkCounts[fw] = (frameworkCounts[fw] || 0) + 1;
        });

        const sortedFrameworks = Object.entries(frameworkCounts).sort(
          (a, b) => b[1] - a[1]
        );
        const topFramework =
          sortedFrameworks.length > 0 ? sortedFrameworks[0][0] : "None";

        setStats({
          totalModels: models.length,
          totalPurchases: purchases.length,
          topFramework,
        });

        // Prepare Chart Data
        const data = sortedFrameworks.map(([name, count]) => ({ name, count }));
        setChartData(data);

        // Recent Models (first 5)
        setRecentActivity(models.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, axiosSecure]);

  if (loading) return <PageLoader />;

  return (
    <Container className="py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-heading">
            Dashboard
          </h1>
          <p className="text-muted mt-1">
            Welcome back,{" "}
            <span className="text-primary font-medium">
              {user?.displayName}
            </span>
            ! Here's your overview.
          </p>
        </div>
        <Link
          to="/dashboard/add-model"
          className="bg-primary text-primary-content px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 cursor-pointer"
        >
          <Activity size={18} />
          Add New Model
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Models"
          value={stats.totalModels}
          icon={Package}
          color="text-blue-500"
          bgColor="bg-blue-500/10"
        />
        <StatsCard
          title="Total Purchases"
          value={stats.totalPurchases}
          icon={ShoppingBag}
          color="text-emerald-500"
          bgColor="bg-emerald-500/10"
        />
        <StatsCard
          title="Top Framework"
          value={stats.topFramework}
          icon={Layers}
          color="text-purple-500"
          bgColor="bg-purple-500/10"
        />
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Framework Distribution Chart */}
        <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold font-heading mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Framework Distribution
          </h3>
          <div className="h-[300px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e2e8f0",
                      borderRadius: "12px",
                      color: "#0f172a",
                    }}
                    itemStyle={{ color: "#10b981" }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#10b981" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted">
                <Package className="w-12 h-12 mb-2 opacity-20" />
                <p>No model data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="text-xl font-semibold font-heading mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Models
          </h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {recentActivity.length > 0 ? (
              recentActivity.map((model) => (
                <div
                  key={model._id}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors border border-transparent hover:border-border/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-base-200 flex items-center justify-center overflow-hidden shrink-0">
                    {model.image ? (
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-foreground">
                      {model.name}
                    </h4>
                    <p className="text-sm text-muted truncate">
                      {model.framework}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted">Purchased</p>
                    <p className="font-semibold text-primary">
                      {model.purchased || 0}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted py-10">
                <p>No recent activity</p>
                <Link
                  to="/dashboard/add-model"
                  className="text-primary text-sm mt-2 hover:underline"
                >
                  Add your first model
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

const StatsCard = ({ title, value, icon: Icon, color, bgColor }) => (
  <div className="bg-base-100 border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className={`p-4 rounded-2xl ${bgColor} ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-muted">{title}</p>
        <h3 className="text-3xl font-bold text-foreground mt-1 font-heading">
          {value}
        </h3>
      </div>
    </div>
  </div>
);

export default Dashboard;
