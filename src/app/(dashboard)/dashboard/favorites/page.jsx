import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, ChefHat, Plus } from "lucide-react";
import { getUserFavorites } from "@/lib/queries/favorite";
import RemoveFavoriteButton from "@/components/dashboard/favorites/RemoveFavoriteButton";

export const metadata = {
  title: "My Favorite Recipes | Dashboard",
};

export default async function FavoriteRecipesPage() {
  const response = await getUserFavorites();
  const favorites = response?.data || [];

  return (
    <div className="space-y-6 w-full max-w-none">
      {/* Header  */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Saved Recipes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal collection of liked and curated recipe layouts.
        </p>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl p-16 text-center max-w-2xl mx-auto mt-8">
          <div className="h-12 w-12 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
            <Heart className="h-5 w-5" />
          </div>
          <h3 className="text-md font-bold text-zinc-900">
            Your layout is looking light
          </h3>
          <p className="text-zinc-500 text-sm max-w-xs mt-2 mb-6">
            Tap the heart icon on any standard or premium recipe across our
            marketplace to save them here.
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
        /* Display Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <div
              key={recipe._id}
              className="group border border-zinc-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
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

                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider shadow-xs z-10">
                    {recipe.cuisineType || "General"}
                  </span>

                  <div className="absolute top-3 right-3 h-7 w-7 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center shadow-xs border border-zinc-100 z-10">
                    <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse-slow" />
                  </div>
                </div>

                <div className="p-5 space-y-1">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                    {recipe.difficultyLevel || "Medium"} Difficulty
                  </span>
                  <h3 className="font-bold text-zinc-900 tracking-tight group-hover:text-red-500 transition-colors line-clamp-1">
                    {recipe.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center gap-2">
                <RemoveFavoriteButton recipeId={recipe._id} />

                <Link
                  href={`/recipes/${recipe._id}`}
                  className="flex-1 h-10 inline-flex items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold text-xs transition-all gap-1.5"
                >
                  View
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
