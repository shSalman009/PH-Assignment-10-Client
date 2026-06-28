import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllTransactions } from "@/lib/queries/transactions";

export default async function TransactionsPage() {
  const transactions = await getAllTransactions();

  const totalRevenue = transactions
    .reduce((sum, transaction) => sum + transaction.amount, 0)
    .toFixed(2);

  const paidTransactions = transactions.filter(
    (transaction) => transaction.paymentStatus === "paid",
  ).length;

  const recipePurchases = transactions.filter(
    (transaction) => transaction.type === "recipe",
  ).length;

  const premiumPurchases = transactions.filter(
    (transaction) => transaction.type === "premium",
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>

        <p className="mt-1 text-muted-foreground">
          View payment history and transaction details across the platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="mt-2 text-3xl font-bold">${totalRevenue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Successful Payments</p>
            <p className="mt-2 text-3xl font-bold">{paidTransactions}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Recipe Purchases</p>
            <p className="mt-2 text-3xl font-bold">{recipePurchases}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Premium Purchases</p>
            <p className="mt-2 text-3xl font-bold">{premiumPurchases}</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-background">
        <Table>
          <TableHeader className="bg-zinc-50 text-zinc-500">
            <TableRow>
              <TableHead className="p-4">User</TableHead>
              <TableHead className="p-4 text-center">Amount</TableHead>
              <TableHead className="p-4 text-center">Type</TableHead>
              <TableHead className="p-4 text-center">Payment Status</TableHead>
              <TableHead className="p-4 text-center">Date</TableHead>
              <TableHead className="p-4">Transaction ID</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                className="hover:bg-muted/40 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        transaction.user.image ||
                        "/images/avatar-placeholder.png"
                      }
                      alt={transaction.user.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full border object-cover"
                    />

                    <div>
                      <p className="font-medium">{transaction.user.name}</p>

                      <p className="text-sm text-muted-foreground">
                        {transaction.user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="font-medium text-center">
                  ${transaction.amount}
                </TableCell>

                <TableCell className="text-center">
                  <Badge variant="outline">{transaction.type}</Badge>
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                    variant={
                      transaction.paymentStatus === "paid"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {transaction.paymentStatus}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground text-center">
                  {new Date(transaction.paidAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell>
                  <code className="rounded bg-muted px-2 py-1 text-xs">
                    {transaction.transactionId}
                  </code>
                </TableCell>
              </TableRow>
            ))}

            {transactions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
