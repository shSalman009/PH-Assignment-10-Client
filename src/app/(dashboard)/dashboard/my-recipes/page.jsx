import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MyRecipesTable from "@/components/dashboard/my-recipes/MyRecipesTable";
import { getUserRecipes } from "@/lib/queries/recipes";

export const metadata = {
  title: "My Recipes | Dashboard",
  description: "Manage your published culinary catalog records.",
};

export default async function MyRecipesPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session?.data?.user) {
    redirect("/login");
  }

  const response = await getUserRecipes(session.data.user.id);
  const recipes = response.success ? response.data : [];

  return (
    <div className="space-y-6 w-full max-w-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Recipes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, track, and update your personal collection of culinary
            masterpieces.
          </p>
        </div>
        <Button asChild className="shadow-sm self-start sm:self-auto gap-2">
          <Link href="/dashboard/add-recipe">
            <Plus className="w-4 h-4" /> Create Recipe
          </Link>
        </Button>
      </div>

      <MyRecipesTable initialRecipes={recipes} />
    </div>
  );
}
