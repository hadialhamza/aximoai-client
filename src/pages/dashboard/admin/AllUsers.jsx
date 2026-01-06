import { useEffect, useState } from "react";
import useSecureAxios from "@/hooks/useSecureAxios";
import Container from "@/components/ui/container/Container";
import SectionHeading from "@/components/ui/sectionHeading/SectionHeading";
import {
  Users,
  Trash2,
  Search,
  Shield,
  UserCheck,
  MoreHorizontal,
  Mail,
} from "lucide-react";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useSecureAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  // Handle Delete User
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete User?",
      text: "This user will be permanently removed from the database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete user!",
      background: "#fff",
      customClass: {
        popup: "rounded-xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/users/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User account has been removed.",
              icon: "success",
              confirmButtonColor: "#3b82f6",
            });
            fetchUsers();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete user.", "error");
        }
      }
    });
  };

  // Helper: Role Badge Color
  const getRoleBadgeStyle = (role) => {
    return role === "admin"
      ? "bg-purple-100 text-purple-700 border-purple-200"
      : "bg-blue-50 text-blue-600 border-blue-200";
  };

  // Helper: Calculate "Active" status (Mock logic: active if login < 7 days ago)
  const isUserActive = (lastLogin) => {
    if (!lastLogin) return false;
    const days = (new Date() - new Date(lastLogin)) / (1000 * 60 * 60 * 24);
    return days < 7;
  };

  // Filter Logic
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Stats Logic
  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    active: users.filter((u) => isUserActive(u.lastLogin)).length,
  };

  return (
    <Container>
      {/* 1. Header */}
      <div className="mb-8">
        <SectionHeading
          title="User Management"
          badge="Admin Panel"
          icon={Users}
          description="Oversee registered users, manage roles, and monitor account activity."
          align="left"
        />
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Card 1 */}
        <div className="bg-base-100 p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Total Users</p>
            {loading ? (
              <div className="h-8 w-16 bg-base-300 rounded animate-pulse mt-1"></div>
            ) : (
              <h3 className="text-2xl font-bold text-base-content">{stats.total}</h3>
            )}
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-base-100 p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 text-purple-600 rounded-lg">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Administrators</p>
            {loading ? (
              <div className="h-8 w-16 bg-base-300 rounded animate-pulse mt-1"></div>
            ) : (
              <h3 className="text-2xl font-bold text-base-content">{stats.admins}</h3>
            )}
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-base-100 p-5 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-lg">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-muted font-medium">Active Recently</p>
            {loading ? (
              <div className="h-8 w-16 bg-base-300 rounded animate-pulse mt-1"></div>
            ) : (
              <h3 className="text-2xl font-bold text-base-content">{stats.active}</h3>
            )}
          </div>
        </div>
      </div>

      {/* 3. Table Container */}
      <div className="bg-base-100 border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted h-4 w-4" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-base-100 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-base-content transition-all placeholder:text-muted/70"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-base-200/50 border-b border-border text-xs uppercase tracking-wider text-muted font-semibold">
                <th className="px-6 py-4">User Identity</th>
                <th className="px-6 py-4">Role & Access</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loading ? (
                // Skeleton Rows
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-base-300"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-base-300 rounded"></div>
                          <div className="h-3 w-24 bg-base-300 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-20 bg-base-300 rounded-full"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-base-300"></div>
                        <div className="h-3 w-12 bg-base-300 rounded"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-base-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <div className="h-8 w-8 bg-base-300 rounded-lg"></div>
                        <div className="h-8 w-8 bg-base-300 rounded-lg"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="group hover:bg-base-200/50 transition-colors"
                  >
                    {/* User Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-base-200 overflow-hidden border border-border flex-shrink-0">
                          <img
                            src={
                              user.photoURL ||
                              "https://i.ibb.co/Fm6d0pP/user.png"
                            }
                            alt={user.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://i.ibb.co/Fm6d0pP/user.png";
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-base-content text-sm">
                            {user.name}
                          </div>
                          <div className="text-xs text-muted flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeStyle(
                          user.role
                        )}`}
                      >
                        {user.role === "admin" && (
                          <Shield className="w-3 h-3" />
                        )}
                        {user.role?.toUpperCase() || "USER"}
                      </span>
                    </td>

                    {/* Status (Based on Last Login) */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${isUserActive(user.lastLogin)
                            ? "bg-emerald-500"
                            : "bg-base-300"
                            }`}
                        ></span>
                        <span className="text-xs text-muted font-medium">
                          {isUserActive(user.lastLogin) ? "Active" : "Offline"}
                        </span>
                      </div>
                    </td>

                    {/* Last Login */}
                    <td className="px-6 py-4 text-sm text-muted">
                      {user.lastLogin ? (
                        <span className="tabular-nums">
                          {new Date(user.lastLogin).toLocaleDateString()}
                          <span className="text-[10px] ml-1 text-muted/70">
                            {new Date(user.lastLogin).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </span>
                      ) : (
                        <span className="text-muted italic">Never</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Placeholder for Edit/View - optional */}
                        <button
                          className="p-2 text-muted hover:text-blue-600 hover:bg-blue-500/10 rounded-lg transition-all"
                          title="View Details"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 text-muted hover:text-error hover:bg-error/10 rounded-lg transition-all"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-muted"
                  >
                    <p>No users found matching "{searchTerm}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-border bg-base-200/30 flex justify-between items-center text-xs text-muted">
          <span>
            {loading ? (
              <span className="h-4 w-20 bg-base-300 rounded inline-block animate-pulse"></span>
            ) : (
              `Showing ${filteredUsers.length} users`
            )}
          </span>
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

export default AllUsers;
