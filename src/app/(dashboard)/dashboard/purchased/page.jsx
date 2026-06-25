import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, ChefHat, Plus } from "lucide-react";
import { getPurchasedRecipes } from "@/lib/queries/recipes";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "My Premium Recipes | Dashboard",
};

export default async function PurchasedRecipesPage() {
  const response = await getPurchasedRecipes();

  const recipes = response?.data || [];

  return (
    <div className="space-y-6 w-full max-w-none">
      {/* Page Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Premium Cookbook
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Access your full lifetime unlocks and professional step breakdown
            configurations.
          </p>
        </div>
        <Button asChild className="shadow-sm self-start sm:self-auto gap-2">
          <Link href="/recipes">Explore More</Link>
        </Button>
      </div>

      {/* Empty State */}
      {recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl p-16 text-center max-w-2xl mx-auto mt-8">
          <div className="h-12 w-12 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-md font-bold text-zinc-900">
            No premium keys active
          </h3>
          <p className="text-zinc-500 text-sm max-w-xs mt-2 mb-6">
            Unlock authentic specialized guides or Bengali cooking blueprints to
            see them cataloged here.
          </p>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-500 transition-colors"
          >
            Browse recipes marketplace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        /* Recipes Card Display Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="group border border-zinc-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Fallback pattern for thumbnail imagery */}
                <div className="relative h-44 bg-zinc-100 overflow-hidden">
                  {recipe.image ? (
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                      <ChefHat className="h-10 w-10 stroke-1" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    {recipe.cuisineType || "Authentic"}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-semibold text-orange-600 uppercase tracking-wider">
                    {recipe.difficultyLevel || "Medium"} Tier Guide
                  </span>
                  <h3 className="font-bold text-zinc-900 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                    {recipe.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Unlocked:{" "}
                    {new Date(recipe.paidAt).toLocaleDateString(undefined, {
                      dateStyle: "medium",
                    })}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/recipes/${recipe._id}`}
                  className="w-full h-10 rounded bg-zinc-50 border border-zinc-200/60 text-zinc-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-orange-600 hover:text-white hover:border-transparent transition-all"
                >
                  View Premium Instructions
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
