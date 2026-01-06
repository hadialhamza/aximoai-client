import { useEffect, useState } from "react";
import useSecureAxios from "@/hooks/useSecureAxios";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import { FileText, TrendingUp, Users, ShoppingBag } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 1. Skeleton Components for Loading State
const StatCardSkeleton = () => (
  <div className="bg-base-100 border border-border rounded-xl p-6 flex items-center justify-between shadow-sm h-[116px]">
    <div className="space-y-3 w-full">
      <div className="h-4 w-24 bg-base-300/50 rounded animate-pulse" />
      <div className="h-8 w-32 bg-base-300 rounded animate-pulse" />
      <div className="h-3 w-20 bg-base-300/50 rounded animate-pulse" />
    </div>
    <div className="h-12 w-12 rounded-full bg-base-300 animate-pulse flex-shrink-0" />
  </div>
);

const ReportsSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex flex-col gap-2 mb-8">
      <div className="h-8 w-48 bg-base-300 rounded" />
      <div className="h-4 w-96 bg-base-300/50 rounded" />
    </div>

    {/* Cards Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>

    {/* Chart Skeleton */}
    <div className="bg-base-100 border border-border rounded-xl p-6 shadow-sm h-[400px] w-full">
      <div className="h-6 w-32 bg-base-300 rounded mb-6" />
      <div className="h-[300px] bg-base-300/30 rounded w-full flex items-end gap-4 p-4">
        <div className="w-full h-[40%] bg-base-300/40 rounded-t"></div>
        <div className="w-full h-[70%] bg-base-300/40 rounded-t"></div>
        <div className="w-full h-[50%] bg-base-300/40 rounded-t"></div>
      </div>
    </div>
  </div>
);

const Reports = () => {
  const axiosSecure = useSecureAxios();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalModels: 0,
    totalRevenue: 0,
    totalPurchases: 0,
  });
  const [loading, setLoading] = useState(true);

  // Colors extracted from your index.css for Recharts
  // Primary: #10b981, Info: #06b6d4, Warning: #f59e0b
  const CHART_COLORS = {
    revenue: "#10b981", // primary
    models: "#06b6d4", // info
    users: "#f59e0b", // warning
    purchases: "#ef4444", // error/red for contrast
  };

  useEffect(() => {
    // Simulating slight delay to show off the skeleton if needed, remove setTimeout in production
    axiosSecure
      .get("/admin/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  const data = [
    {
      name: "Overview",
      Users: stats.totalUsers,
      Models: stats.totalModels,
      Purchases: stats.totalPurchases,
    },
  ];

  // Custom Tooltip for Recharts to match Dark/Light Theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-100 border border-border p-3 rounded-lg shadow-lg">
          <p className="font-heading font-semibold text-base-content mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Container>
        <ReportsSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <SectionHeading
        title="System Reports"
        badge="Analytics"
        icon={FileText}
        description="View system performance and usage statistics."
        align="left"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue */}
        <div className="bg-base-100 border border-border rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-sm font-medium text-muted">Total Revenue</div>
            <div className="text-2xl font-bold text-primary mt-1 font-heading">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-muted mt-1 opacity-80">
              Estimated Value
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Models */}
        <div className="bg-base-100 border border-border rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-sm font-medium text-muted">Total Models</div>
            <div className="text-2xl font-bold text-info mt-1 font-heading">
              {stats.totalModels}
            </div>
            <div className="text-xs text-muted mt-1 opacity-80">
              Inventory Count
            </div>
          </div>
          <div className="p-3 bg-info/10 rounded-xl text-info">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Users */}
        <div className="bg-base-100 border border-border rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-sm font-medium text-muted">Total Users</div>
            <div className="text-2xl font-bold text-warning mt-1 font-heading">
              {stats.totalUsers}
            </div>
            <div className="text-xs text-muted mt-1 opacity-80">
              Active Accounts
            </div>
          </div>
          <div className="p-3 bg-warning/10 rounded-xl text-warning">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Purchases */}
        <div className="bg-base-100 border border-border rounded-xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="text-sm font-medium text-muted">
              Total Purchases
            </div>
            <div className="text-2xl font-bold text-error mt-1 font-heading">
              {stats.totalPurchases}
            </div>
            <div className="text-xs text-muted mt-1 opacity-80">
              Transactions
            </div>
          </div>
          <div className="p-3 bg-error/10 rounded-xl text-error">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-base-100 border border-border rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-heading font-semibold mb-6 text-base-content">
          Activity Overview
        </h3>

        {/* Responsive Height Container */}
        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barGap={20}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                opacity={0.5}
              />
              <XAxis
                dataKey="name"
                stroke="var(--color-muted)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--color-muted)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "var(--color-base-200)", opacity: 0.4 }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />

              <Bar
                dataKey="Users"
                fill={CHART_COLORS.users}
                radius={[4, 4, 0, 0]}
                name="Total Users"
              />
              <Bar
                dataKey="Models"
                fill={CHART_COLORS.models}
                radius={[4, 4, 0, 0]}
                name="Total Models"
              />
              <Bar
                dataKey="Purchases"
                fill={CHART_COLORS.purchases}
                radius={[4, 4, 0, 0]}
                name="Total Purchases"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Container>
  );
};

export default Reports;
