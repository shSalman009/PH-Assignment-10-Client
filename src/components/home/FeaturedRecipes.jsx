import { getFeaturedRecipes, getRecipes } from "@/lib/queries/recipes";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default async function FeaturedRecipes() {
  const res = await getFeaturedRecipes();
  const featuredRecipes = res?.data || [];

  return (
    <section className="py-12">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="pb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Featured Recipes
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Handpicked culinary masterpieces curated by our community and
            editors.
          </p>
        </div>

        {/* Recipes Grid */}
        {featuredRecipes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl bg-white">
            No featured recipes highlighted at the moment. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
              <Card
                key={recipe._id}
                className="group gap-0 overflow-hidden p-0 border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Hero Image */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category */}
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-800 backdrop-blur">
                    {recipe.category}
                  </span>

                  {/* Featured */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    Featured
                  </div>

                  {/* Recipe Name */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-white">
                      {recipe.name}
                    </h3>
                  </div>
                </div>

                <CardContent className="space-y-3 p-5">
                  {/* Cuisine */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-orange-600">
                      {recipe.cuisineType}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{recipe.preparationTime} mins</span>
                    </div>

                    <Link
                      href={`/recipes/${recipe._id}`}
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 text-white hover:bg-orange-600 transition-colors shadow-sm"
                      title="View Details"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
