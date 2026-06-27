import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserActionCell } from "@/components/dashboard/admin/users/UserActionCell";
import { getAllUsers } from "@/lib/queries/users";

export default async function ManageUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <p className="mt-1 text-muted-foreground">
          Manage user accounts, permissions, and platform access.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-background">
        <Table>
          <TableHeader className="bg-zinc-50 text-zinc-500">
            <TableRow>
              <TableHead className="p-4">User</TableHead>
              <TableHead className="p-4">Role</TableHead>
              <TableHead className="p-4">Plan</TableHead>
              <TableHead className="p-4">Status</TableHead>
              <TableHead className="p-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                className="hover:bg-muted/40 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium leading-none">{user.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "outline"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    className={
                      user.isPremium
                        ? "bg-yellow-500 hover:bg-yellow-500 text-white"
                        : ""
                    }
                    variant={user.isPremium ? undefined : "secondary"}
                  >
                    {user.isPremium ? "Premium" : "Free"}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={user.isBlocked ? "destructive" : "secondary"}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  {user.role === "admin" ? (
                    <Badge variant="secondary">Protected</Badge>
                  ) : (
                    <UserActionCell
                      userId={user._id}
                      initialStatus={user.isBlocked}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
