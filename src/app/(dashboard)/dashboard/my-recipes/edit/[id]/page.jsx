import React from "react";
import { notFound } from "next/navigation";
import { getRecipeById } from "@/lib/queries/recipes";
import RecipeForm from "@/components/dashboard/RecipeForm";

export const metadata = {
  title: "Edit Recipe | Dashboard",
  description: "Modify all fields, instructions, and ingredients safely.",
};

export default async function EditRecipePage({ params }) {
  const { id } = await params;

  // Fetch the existing recipe data by ID to pre-populate the form
  const response = await getRecipeById(id);

  if (!response.success || !response.data) {
    notFound();
  }

  const recipe = response.data;

  return (
    <div className="space-y-6 w-full max-w-none">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Edit Recipe</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Modifying configuration parameters for:{" "}
          <span className="font-semibold text-foreground">"{recipe.name}"</span>
        </p>
      </div>

      <RecipeForm initialData={recipe} />
    </div>
  );
}
