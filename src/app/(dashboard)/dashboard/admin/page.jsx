import { Users, Crown, ChefHat, Flag } from "lucide-react";
import { getAdminStats } from "@/lib/queries/stats";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminDashboard() {
  const stats = await getAdminStats();
  console.log(stats);
  return (
    <div className="space-y-6 w-full max-w-none">
      {/*  Header Section */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Monitor platform health, user growth, and content moderation reports.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="w-5 h-5" />}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Premium"
          value={stats.premiumUsers}
          icon={<Crown className="w-5 h-5" />}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Total Recipes"
          value={stats.totalRecipes}
          icon={<ChefHat className="w-5 h-5" />}
          color="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Reports"
          value={stats.totalReports}
          icon={<Flag className="w-5 h-5" />}
          color="bg-red-50 text-red-600"
        />
      </div>

      {/* User Table */}
      <div className="bg-white border border-zinc-100 rounded-xl shadow-xs overflow-hidden">
        <div className="p-6 border-b border-zinc-100">
          <h2 className="font-bold text-zinc-900">Recent Signups</h2>
        </div>

        <Table>
          <TableHeader className="bg-zinc-50 text-zinc-500 font-medium text-left">
            <TableRow>
              <TableHead className="p-4">User</TableHead>
              <TableHead className="p-4">Email</TableHead>
              <TableHead className="p-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.recentUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="p-4 font-medium">{user.name}</TableCell>
                <TableCell className="text-zinc-500 p-4">
                  {user.email}
                </TableCell>
                <TableCell className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${user.isPremium ? "bg-amber-100 text-amber-700" : "bg-zinc-100 text-zinc-600"}`}
                  >
                    {user.isPremium ? "Pro" : "Free"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white border border-zinc-100 p-6 rounded-xl shadow-xs space-y-2">
      <div className={`p-2 rounded-lg w-fit ${color}`}>{icon}</div>
      <p className="text-zinc-500 text-sm font-medium">{title}</p>
      <p className="text-2xl font-black text-zinc-900">{value}</p>
    </div>
  );
}
