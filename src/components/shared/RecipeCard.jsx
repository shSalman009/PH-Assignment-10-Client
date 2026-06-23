import React from "react";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Colors theme for different type of difficulty level
const DIFFICULTY_THEMES = {
  easy: "text-emerald-600 bg-emerald-50 border-emerald-100",
  medium: "text-amber-600 bg-amber-50 border-amber-100",
  hard: "text-rose-600 bg-rose-50 border-rose-100",
  default: "text-zinc-600 bg-zinc-50 border-zinc-100",
};

export default function RecipeCard({ recipe }) {
  const recipeId = recipe._id;

  const difficultyRaw = (recipe.difficultyLevel || "Easy").toLowerCase();

  const difficultyConfig =
    DIFFICULTY_THEMES[difficultyRaw] || DIFFICULTY_THEMES.default;

  return (
    <Card className="group overflow-hidden border border-zinc-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col w-full">
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-zinc-50">
        <Image
          src={recipe.image || "/api/placeholder/400/300"}
          alt={recipe.name}
          fill
          sizes="(max-w-7xl) 25vw, (max-w-md) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-101"
          priority={false}
        />

        <div className="absolute top-2.5 left-2.5">
          <span className="bg-white/90 backdrop-blur-sm text-zinc-800 border border-zinc-200/40 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
            {recipe.category || "Recipe"}
          </span>
        </div>
      </div>

      {/* Recipe Info */}
      <CardContent className="px-0 pt-3 pb-0 flex flex-col flex-1 justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold tracking-widest text-orange-600 uppercase">
            {recipe.cuisineType || "International"}
          </span>

          <Link href={`/recipes/${recipeId}`} className="block">
            <h3 className="font-bold text-base text-zinc-900 tracking-tight leading-snug line-clamp-2 hover:text-orange-600 transition-colors">
              {recipe.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between text-xs font-medium text-zinc-400 pt-3 mt-4 border-t border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-zinc-400" />
              <span>{recipe.preparationTime} mins</span>
            </div>

            <span>•</span>

            <div
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold tracking-wide transition-colors ${difficultyConfig}`}
            >
              <span className="capitalize">{difficultyRaw}</span>
            </div>
          </div>

          <Link
            href={`/recipes/${recipeId}`}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-white hover:bg-orange-600 transition-colors shadow-sm"
            title="View Details"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
