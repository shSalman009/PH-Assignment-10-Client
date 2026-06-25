import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, ChefHat, Flame, ListCheck, Lock } from "lucide-react";
import RecipeActionsRow from "@/components/recipes/RecipeActionsRow";
import { getRecipeById } from "@/lib/queries/recipes";
import PurchaseButton from "@/components/recipes/PurchaseButton";
import { getUserSession } from "@/lib/services/session";
import { getTransaction } from "@/lib/queries/transactions";
import { getLike } from "@/lib/queries/likes";
import { getFavoriteRecipe } from "@/lib/queries/favorite";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const response = await getRecipeById(id);

  return {
    title: response.success
      ? `${response.data.name} | Recipe Hub`
      : "Recipe Details",
  };
}

export default async function RecipeDetailsPage({ params }) {
  const { id } = await params;
  const response = await getRecipeById(id);

  if (!response.success || !response.data) {
    notFound();
  }

  const recipe = response.data;

  const user = await getUserSession();
  const isLoggedIn = !!user;

  let isPurchased = false;
  let isLiked = false;
  let isFavorite = false;

  if (isLoggedIn) {
    const transaction = await getTransaction(id);
    if (transaction?.data?._id) {
      isPurchased = true;
    }

    const like = await getLike(id);
    if (like?.data?._id) {
      isLiked = true;
    }

    const favorite = await getFavoriteRecipe(id);
    if (favorite?.data?._id) {
      isFavorite = true;
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-16 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Recipe Details */}
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 fill-current" />{" "}
              {recipe.category || "General"}
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
              {recipe.name}
            </h1>
          </div>

          {/* Recipe Actions */}
          <RecipeActionsRow
            recipeId={recipe._id}
            initialLikes={recipe.likeCount || 0}
            isLoggedIn={isLoggedIn}
            initialIsLiked={isLiked}
            isFavorite={isFavorite}
            userEmail={user?.email}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100 shadow-xs">
              <Image
                src={recipe.image || "/api/placeholder/800/450"}
                alt={recipe.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Recipe Info */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white border border-zinc-100 rounded-xl shadow-xs text-center">
              <div className="flex flex-col items-center py-1">
                <Clock className="h-5 w-5 text-zinc-400 mb-1" />
                <span className="text-xs text-zinc-400 font-medium">
                  Prep Time
                </span>
                <span className="text-sm font-bold text-zinc-800">
                  {recipe.preparationTime} mins
                </span>
              </div>
              <div className="flex flex-col items-center py-1">
                <ChefHat className="h-5 w-5 text-zinc-400 mb-1" />
                <span className="text-xs text-zinc-400 font-medium">
                  Cuisine
                </span>
                <span className="text-sm font-bold text-zinc-800 capitalize">
                  {recipe.cuisineType || "intl"}
                </span>
              </div>
              <div className="flex flex-col items-center py-1">
                <ListCheck className="h-5 w-5 text-zinc-400 mb-1" />
                <span className="text-xs text-zinc-400 font-medium">
                  Ingredients
                </span>
                <span className="text-sm font-bold text-zinc-800">
                  {(recipe.ingredients || []).length} Items
                </span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-zinc-900 border-b pb-2">
                Ingredients Needed
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(recipe.ingredients || []).map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2.5 text-sm text-zinc-600 bg-zinc-50/60 p-2.5 rounded-lg border border-zinc-100"
                  >
                    <span className="h-2 w-2 rounded-full bg-orange-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-xs space-y-4 relative overflow-hidden">
              <h3 className="font-bold text-lg text-zinc-900 border-b pb-2">
                Step-by-Step Instructions
              </h3>

              <div
                className={
                  !isPurchased
                    ? "blur-xs select-none pointer-events-none space-y-4 opacity-40"
                    : "space-y-4"
                }
              >
                {(recipe.instructions || []).map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start border-b border-zinc-50 pb-3 last:border-0"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-900 text-white text-xs font-bold">
                      {index + 1}
                    </span>
                    <p className="text-sm text-zinc-600 pt-0.5 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              {/* Lock Instruction if not purchased*/}
              {!isPurchased && (
                <div className="absolute inset-0 bg-linear-to-t from-white/20 via-transparent to-transparent flex flex-col items-center justify-center p-6 text-center pt-16">
                  <div className="bg-zinc-900 text-white rounded-full p-3 shadow-md mb-2">
                    <Lock className="h-5 w-5 text-orange-500" />
                  </div>
                  <h4 className="font-bold text-base text-zinc-900">
                    Instructions Locked
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-xs mt-1">
                    Please purchase this recipe formula to unlock the complete
                    cooking steps.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Container Card */}
          <div className="space-y-6">
            <div className="bg-zinc-900 text-white border border-zinc-800 rounded-2xl p-6 shadow-md space-y-6">
              <div className="space-y-1">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${isPurchased ? "text-emerald-400" : "text-zinc-400"}`}
                >
                  {isPurchased ? "Owned Content" : "Premium Access"}
                </span>

                {isPurchased ? (
                  <div className="text-xl font-bold tracking-tight text-zinc-100 pt-1">
                    You own this guide 🎉
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black tracking-tight">
                      ${recipe.price || "4.99"}
                    </span>
                    <span className="text-zinc-400 text-xs font-medium">
                      one-time purchase
                    </span>
                  </div>
                )}
              </div>

              <div className="text-zinc-400 text-xs space-y-2 border-t border-zinc-800 pt-4">
                <p>
                  {isPurchased
                    ? "✓ Unlimited lifetime dashboard access"
                    : "• Get unlimited lifetime dashboard access."}
                </p>
                <p>
                  {isPurchased
                    ? "✓ Includes professional "
                    : "• Includes professional "}
                  {recipe.difficultyLevel || "Medium"} tier breakdown.
                </p>
                <p>
                  {isPurchased
                    ? "✓ Verified authentic "
                    : "• Verified authentic "}
                  {recipe.cuisineType || "Bengali"} preparation layout steps.
                </p>
              </div>

              <PurchaseButton
                recipeId={recipe._id}
                price={4.99}
                isLoggedIn={isLoggedIn}
                isPurchased={isPurchased}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
