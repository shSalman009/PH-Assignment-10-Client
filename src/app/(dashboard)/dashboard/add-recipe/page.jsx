import RecipeForm from "@/components/dashboard/RecipeForm";
import Link from "next/link";
import { AlertCircle, Crown, Trash2, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PremiumPurchaseButton from "@/components/dashboard/profile/PremiumPurchaseButton";
import { getUserSession } from "@/lib/services/session";
import { redirect } from "next/navigation";
import { getUserRecipes } from "@/lib/queries/recipes";

export const metadata = {
  title: "Add New Recipe | Dashboard",
  description:
    "Create and publish a brand new recipe to your collection securely.",
};

export default async function AddRecipePage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  const response = await getUserRecipes(user.id);
  const recipes = response.success ? response.data : [];

  const recipeCount = recipes?.length || 0;

  const maxRecipes = 2;

  return (
    <div className="space-y-6 w-full max-w-none">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Add New Recipe</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Deploy schema-validated parameters through modern server mutations.
        </p>
      </div>

      {recipeCount >= maxRecipes ? (
        <div className="flex items-center justify-center min-h-[60vh] p-6">
          <Card className="max-w-md w-full bg-white border-zinc-100 shadow-xl shadow-zinc-200/50 rounded-3xl p-8 text-center space-y-6">
            <CardHeader className="space-y-4 p-0">
              <div className="mx-auto bg-amber-50 w-20 h-20 flex items-center justify-center rounded-2xl border border-amber-100">
                <Crown className="w-10 h-10 text-amber-500 fill-amber-400" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black text-zinc-900 tracking-tight">
                  Free Limit Reached
                </CardTitle>
                <CardDescription className="text-zinc-500 leading-relaxed max-w-[280px] mx-auto">
                  You've hit the 2-recipe limit for free accounts. Go Pro to
                  publish unlimited recipes and support the community.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-0 space-y-3">
              {/* Main Call to Action - More prominent */}
              <PremiumPurchaseButton className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl shadow-lg shadow-zinc-900/20" />

              {/* Secondary Action */}
              <Button
                asChild
                variant="ghost"
                className="w-full h-12 text-zinc-500 hover:text-zinc-900 font-semibold"
              >
                <Link href="/dashboard/my-recipes">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Manage existing recipes
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <RecipeForm />
      )}
    </div>
  );
}
