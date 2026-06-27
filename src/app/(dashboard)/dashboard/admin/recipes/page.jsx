import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getRecipes } from "@/lib/queries/recipes";
import { RecipeActionCell } from "@/components/dashboard/admin/recipes/RecipeActionCell";

export default async function ManageRecipesPage() {
  const response = await getRecipes();
  const recipes = response?.data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">Manage Recipes</h1>

        <p className="mt-1 text-muted-foreground">
          Review, feature, edit, and remove recipes shared by users.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border bg-background">
        <Table>
          <TableHeader className="bg-zinc-50 text-zinc-500">
            <TableRow>
              <TableHead className="p-4">Recipe</TableHead>
              <TableHead className="p-4">Author</TableHead>
              <TableHead className="p-4">Category</TableHead>
              <TableHead className="p-4">Difficulty</TableHead>
              <TableHead className="p-4">Likes</TableHead>
              <TableHead className="p-4">Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recipes.map((recipe) => (
              <TableRow
                key={recipe._id}
                className="hover:bg-muted/40 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-md object-cover border"
                    />

                    <div>
                      <p className="font-medium line-clamp-1">{recipe.name}</p>

                      <p className="text-sm text-muted-foreground">
                        {recipe.cuisineType}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{recipe.authorName}</p>

                    <p className="text-sm text-muted-foreground">
                      {recipe.authorEmail}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="outline">{recipe.category}</Badge>
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">{recipe.difficultyLevel}</Badge>
                </TableCell>

                <TableCell>{recipe.likeCount}</TableCell>

                <TableCell>
                  <Badge variant={recipe.isFeatured ? "default" : "secondary"}>
                    {recipe.isFeatured ? "Featured" : "Not Featured"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <RecipeActionCell
                    recipeId={recipe._id}
                    isFeatured={recipe.isFeatured}
                    recipeName={recipe.name}
                  />
                </TableCell>
              </TableRow>
            ))}

            {recipes.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  No recipes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
