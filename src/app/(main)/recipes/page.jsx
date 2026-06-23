import React from "react";
import Link from "next/link";
import { Search, FilterX, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import RecipeCard from "@/components/shared/RecipeCard";
import { getRecipes } from "@/lib/queries/recipes";

export const metadata = {
  title: "Browse Recipes | Recipe Hub",
  description: "Explore exquisite recipes curated by home chefs worldwide.",
};

const CATEGORIES = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Desserts",
  "Beverages",
];

export default async function BrowseRecipesPage({ searchParams }) {
  const params = await searchParams;
  const currentSearch = params?.search || "";
  const currentCategory = params?.category || "All";

  const response = await getRecipes({
    search: currentSearch,
    category: currentCategory,
  });

  // Get recipes
  const recipes = response.success ? response.data : [];

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        <div className="flex flex-col lg:flex-row items-center md:items-start lg:items-center justify-between gap-6 mb-10">
          <div className="text-center md:text-start">
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Explore Culinary Creations
            </h1>
            <p className="text-muted-foreground">
              Browse through hundreds of delicious, field-tested formulas
              crafted by our expert community.
            </p>
          </div>

          {/* Search Bar */}
          <form
            method="GET"
            action="/recipes"
            className="relative flex max-w-xl w-full items-center"
          >
            <div className="relative flex-1">
              <Input
                name="search"
                type="text"
                placeholder="Search by ingredients or recipe title..."
                defaultValue={currentSearch}
                className="w-full rounded-l-full rounded-r-none pl-4 pr-4 h-10 border border-input bg-background shadow-inner focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer flex h-10 w-16 items-center justify-center rounded-r-full border border-l-0 border-input bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-xs shrink-0"
            >
              <Search className="h-4 w-4" />
            </button>

            {currentCategory !== "All" && (
              <input type="hidden" name="category" value={currentCategory} />
            )}
          </form>
        </div>

        {/* Filter Recipes By Category */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-2">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat;

            const urlParams = new URLSearchParams();
            if (currentSearch) urlParams.append("search", currentSearch);
            if (cat !== "All") urlParams.append("category", cat);
            const path = `/recipes${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;

            return (
              <Link
                key={cat}
                href={path}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all shrink-0 shadow-sm ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground hover:text-foreground border-border/60 hover:bg-muted/50"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Recipes Container Grid */}
        {recipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 border border-dashed rounded-2xl bg-muted/10">
            <FilterX className="h-10 w-10 text-muted-foreground mb-3" />
            <h3 className="font-bold text-lg tracking-tight">
              No recipes matching parameters
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mt-1 mb-6">
              We couldn't locate any records fitting that description. Try
              broadening your keywords.
            </p>
            <Link
              href="/recipes"
              className="px-4 py-2 text-xs font-semibold bg-secondary text-secondary-foreground rounded-lg border hover:bg-secondary/80 transition-colors"
            >
              Clear All Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
