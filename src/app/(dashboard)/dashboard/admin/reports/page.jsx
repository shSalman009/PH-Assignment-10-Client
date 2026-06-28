import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllReports } from "@/lib/queries/reports";
import { ReportActionCell } from "@/components/dashboard/admin/reports/ReportActionCell";

export default async function RecipeReportsPage() {
  const reports = await getAllReports();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Recipe Reports</h1>

        <p className="mt-1 text-muted-foreground">
          Review recipe reports submitted by users and take moderation actions.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-background">
        <Table>
          <TableHeader className="bg-zinc-50 text-zinc-500">
            <TableRow>
              <TableHead className="p-4">Recipe</TableHead>
              <TableHead className="p-4">Reporter</TableHead>
              <TableHead className="p-4">Reason</TableHead>
              <TableHead className="p-4">Status</TableHead>
              <TableHead className="p-4">Reported On</TableHead>
              <TableHead className="p-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reports.map((report) => (
              <TableRow
                key={report._id}
                className="hover:bg-muted/40 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={report.recipe.image}
                      alt={report.recipe.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-md border object-cover"
                    />

                    <div>
                      <p className="font-medium line-clamp-1">
                        {report.recipe.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {report.recipe.category}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>{report.reporterEmail}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      report.reason === "Spam" ? "secondary" : "destructive"
                    }
                  >
                    {report.reason}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      report.status === "pending" ? "outline" : "default"
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {new Date(report.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell className="text-right">
                  <ReportActionCell
                    reportId={report._id}
                    recipeId={report.recipeId}
                  />
                </TableCell>
              </TableRow>
            ))}

            {reports.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
