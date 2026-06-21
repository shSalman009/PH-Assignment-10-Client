import AddRecipeForm from "@/components/dashboard/add-recipe/AddRecipeForm";

export const metadata = {
  title: "Add New Recipe | Dashboard",
  description:
    "Create and publish a brand new recipe to your collection securely.",
};

export default function AddRecipePage() {
  return (
    <div className="space-y-6 w-full max-w-none">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Add New Recipe</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Deploy schema-validated parameters through modern server mutations.
        </p>
      </div>

      <AddRecipeForm />
    </div>
  );
}
