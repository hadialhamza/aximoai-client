import React, { useEffect, useState } from "react";
import useSecureAxios from "@/hooks/useSecureAxios";
import useAuth from "@/hooks/useAuth";
import Container from "@/components/ui/container/Container";
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
import {
  Package,
  ShoppingBag,
  Layers,
  Activity,
  Plus,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
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
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    // Time-based greeting logic
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const fetchData = async () => {
      try {
        // Parallel data fetching
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

        // Prepare Chart Data (Top 5 frameworks to keep chart clean)
        const data = sortedFrameworks
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }));
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

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 border border-border p-3 rounded-xl shadow-xl">
          <p className="font-semibold text-foreground mb-1">{label}</p>
          <p className="text-primary text-sm">
            Models: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <DashboardSkeleton />;

  return (
    <Container className="py-8 space-y-8">
      {/* 1. Enhanced Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-border/50 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground font-heading tracking-tight">
            {greeting},{" "}
            <span className="text-primary">
              {user?.displayName?.split(" ")[0]}
            </span>
          </h1>
          <p className="text-muted mt-2 text-lg">
            Here is what's happening with your models today.
          </p>
        </div>
        <div className="flex gap-3">
          {/* Secondary Action */}
          <Link
            to="/dashboard/my-models"
            className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-foreground bg-base-200 hover:bg-base-300 transition-all"
          >
            View Inventory
          </Link>
          {/* Primary Action */}
          <Link
            to="/dashboard/add-model"
            className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
          >
            <Plus size={20} />
            Create Model
          </Link>
        </div>
      </div>

      {/* 2. Stats Grid with Gradients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Models"
          value={stats.totalModels}
          icon={Package}
          trend="+12% from last month" // Placeholder for visual, dynamic if you have history
          color="text-blue-500"
          gradient="from-blue-500/10 to-blue-500/5"
          borderColor="border-blue-500/20"
        />
        <StatsCard
          title="Total Purchases"
          value={stats.totalPurchases}
          icon={ShoppingBag}
          trend="+5% from last month"
          color="text-emerald-500"
          gradient="from-emerald-500/10 to-emerald-500/5"
          borderColor="border-emerald-500/20"
        />
        <StatsCard
          title="Top Framework"
          value={stats.topFramework}
          icon={Layers}
          trend="Most popular"
          color="text-purple-500"
          gradient="from-purple-500/10 to-purple-500/5"
          borderColor="border-purple-500/20"
        />
      </div>

      {/* 3. Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section (Takes 2 columns) */}
        <div className="lg:col-span-2 bg-base-100 border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold font-heading flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Framework Analytics
            </h3>
            <select className="bg-base-200 border-none text-sm rounded-lg px-3 py-1 focus:ring-1 focus:ring-primary outline-none">
              <option>Last 30 Days</option>
              <option>All Time</option>
            </select>
          </div>

          <div className="h-[320px] w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[6, 6, 0, 0]}
                    fill="url(#colorUv)"
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted">
                <Package className="w-12 h-12 mb-3 opacity-20" />
                <p>No analytics data available yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity List (Takes 1 column) */}
        <div className="lg:col-span-1 bg-base-100 border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold font-heading">Recent Models</h3>
            <Link
              to="/dashboard/my-models"
              className="p-2 hover:bg-base-200 rounded-full transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-muted" />
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
            {recentActivity.length > 0 ? (
              recentActivity.map((model) => (
                <Link
                  key={model._id}
                  to={`/dashboard/update-model/${model._id}`}
                  className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-base-200/50 transition-all border border-transparent hover:border-border cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:scale-105 transition-transform">
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
                    <h4 className="font-semibold text-sm truncate text-foreground group-hover:text-primary transition-colors">
                      {model.name}
                    </h4>
                    <p className="text-xs text-muted truncate mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {model.framework}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-medium bg-base-200 px-2 py-1 rounded-lg text-foreground">
                      ${model.price || "Free"}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted py-10">
                <p>No recent activity</p>
                <Link
                  to="/dashboard/add-model"
                  className="text-primary text-sm mt-2 hover:underline font-medium"
                >
                  Create your first model
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

// 4. Enhanced Stats Card Component
const StatsCard = ({
  title,
  value,
  icon: Icon,
  color,
  gradient,
  borderColor,
  trend,
}) => (
  <div
    className={`bg-base-100 border ${borderColor} bg-gradient-to-br ${gradient} rounded-3xl p-6 shadow-sm relative overflow-hidden group`}
  >
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-muted uppercase tracking-wide">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-foreground mt-2 font-heading tracking-tight">
          {value}
        </h3>
        {trend && (
          <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-500 bg-white/50 w-fit px-2 py-1 rounded-lg dark:bg-black/20">
            <TrendingUp size={12} />
            {trend}
          </div>
        )}
      </div>
      <div
        className={`p-3 rounded-2xl bg-white shadow-sm dark:bg-base-200 ${color} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

// 5. Skeleton Loader Component
const DashboardSkeleton = () => (
  <Container className="py-8 space-y-8 animate-pulse">
    <div className="flex justify-between items-center">
      <div className="space-y-3">
        <div className="h-8 w-64 bg-base-300 rounded-xl"></div>
        <div className="h-4 w-48 bg-base-200 rounded-lg"></div>
      </div>
      <div className="h-12 w-32 bg-base-300 rounded-xl"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-40 bg-base-200 rounded-3xl border border-border/50"
        ></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 h-[400px] bg-base-200 rounded-3xl border border-border/50"></div>
      <div className="lg:col-span-1 h-[400px] bg-base-200 rounded-3xl border border-border/50"></div>
    </div>
  </Container>
);

export default Dashboard;
