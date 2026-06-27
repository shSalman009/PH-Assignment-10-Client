import React from "react";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/services/session";
import { ChefHat, Heart, Star, Crown } from "lucide-react";
import { apiClient } from "@/lib/services/apiClient";
import PremiumPurchaseButton from "@/components/dashboard/profile/PremiumPurchaseButton";

export default async function DashboardOverview() {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  let stats = { totalRecipes: 0, totalFavorites: 0, totalLikesReceived: 0 };
  try {
    const response = await apiClient(`/users/${user.id}/stats`, {
      method: "GET",
    });

    if (response?.data) {
      stats = response.data;
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
  }

  const isPremium = user?.isPremium || false;

  return (
    <div className="space-y-6 w-full max-w-none">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          {isPremium && (
            <span className="inline-flex items-center gap-1 bg-linear-to-r from-amber-200 to-orange-300 text-orange-900 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm">
              <Crown className="h-3 w-3" />
              Pro <span className="sm:inline-block hidden">Member</span>
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back, {user.name}! Here is what is happening with your recipes
          today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Recipes Card */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-xs flex flex-col gap-4 transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
              <ChefHat className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">Total Recipes</p>
              <div className="flex items-baseline gap-1.5">
                <p className="text-2xl font-black text-zinc-900">
                  {stats.totalRecipes}
                </p>

                {/* Show free user limit */}
                {!isPremium ? (
                  <p className="text-sm font-bold text-zinc-400">/ 2</p>
                ) : (
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-md ml-1">
                    Unlimited
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar (Only visible to non-premium users) */}
          {!isPremium && (
            <div className="space-y-1.5 pt-2 border-t border-zinc-100">
              <div className="flex justify-between text-xs font-medium">
                <span
                  className={
                    stats.totalRecipes >= 2 ? "text-red-500" : "text-zinc-500"
                  }
                >
                  {stats.totalRecipes >= 2 ? "Limit Reached" : "Free limit"}
                </span>
                <span className="text-zinc-700">
                  {Math.min(stats.totalRecipes, 2)} of 2 used
                </span>
              </div>
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    stats.totalRecipes >= 2 ? "bg-red-500" : "bg-orange-500"
                  }`}
                  style={{
                    width: `${Math.min((stats.totalRecipes / 2) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Total Favorites Card */}
        <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
          <div className="h-14 w-14 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Saved Favorites</p>
            <p className="text-2xl font-black text-zinc-900">
              {stats.totalFavorites}
            </p>
          </div>
        </div>

        {/* Total Likes Received Card */}
        <div className="bg-white border border-zinc-100 rounded-xl p-6 shadow-xs flex items-center gap-4 transition-all hover:shadow-md">
          <div className="h-14 w-14 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
            <Star className="h-6 w-6 fill-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-500">Likes Received</p>
            <p className="text-2xl font-black text-zinc-900">
              {stats.totalLikesReceived}
            </p>
          </div>
        </div>
      </div>

      {!isPremium && (
        <div className="mt-8 bg-linear-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden">
          {/* Decorative background icon */}
          <Crown className="absolute -right-8 -top-8 h-40 w-40 text-orange-500/5 rotate-12 pointer-events-none" />

          <div className="relative z-10 space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-orange-100/80 text-orange-800 px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase mb-1">
              <Star className="h-3 w-3 fill-orange-500 text-orange-500" />
              Limited Account
            </div>
            <h2 className="text-xl font-black text-orange-950 tracking-tight">
              Unlock Unlimited Publishing
            </h2>
            <p className="text-sm text-orange-800/80 max-w-xl leading-relaxed">
              You are currently on the standard tier. Upgrade to PRO today for a
              one-time payment of <strong>$19.99</strong> to remove all recipe
              limits and activate your verified badge.
            </p>
          </div>

          <div className="relative z-10 w-full md:w-auto shrink-0">
            <PremiumPurchaseButton />
          </div>
        </div>
      )}
    </div>
  );
}
