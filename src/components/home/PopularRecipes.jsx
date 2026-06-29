import { getPopularRecipes } from "@/lib/queries/recipes";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Heart, User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "../ui/badge";

export default async function PopularRecipes() {
  const res = await getPopularRecipes();
  const popularRecipes = res?.data || [];
  console.log(popularRecipes);

  return (
    <section className="py-12">
      <div className="container max-w-6xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="pb-4">
          <h1 className="text-3xl font-bold tracking-tight">Popular Recipes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Explore the highest-liked recipes shared by our talented home chefs.
          </p>
        </div>

        {/* Recipes Grid */}
        {popularRecipes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl bg-white">
            No popular recipes highlighted at the moment. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularRecipes.map((recipe) => (
              <Card className="group overflow-hidden border p-0 gap-0 border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                {/* Image */}
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                  />

                  {/* Popular Badge */}
                  <Badge className="absolute left-4 top-4 bg-rose-600 text-white flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold shadow">
                    <Heart className="h-3.5 w-3.5 fill-current" /> Popular
                  </Badge>

                  {/* Likes */}
                </div>

                <CardContent className="space-y-4 p-5">
                  {/* Title */}
                  <Link href={`/recipes/${recipe._id}`}>
                    <h3 className="line-clamp-2 text-lg font-bold leading-snug text-zinc-900 transition-colors group-hover:text-orange-600">
                      {recipe.name}
                    </h3>
                  </Link>

                  {/* Author */}
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <User className="h-4 w-4" />
                    <span>{recipe.author.name}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-rose-600">
                      <Heart className="h-4 w-4 fill-current" />
                      <span>{recipe.likeCount} Likes</span>
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
