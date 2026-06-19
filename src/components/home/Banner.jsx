import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Flame, Clock, Star } from "lucide-react";

export default function Banner() {
  return (
    <div className="relative overflow-hidden bg-card text-card-foreground border-b">
      {/* Background Accents */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-125 h-125 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-150 h-150 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discover Your Next Favorite Meal</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
              Cooking Made <span className="text-primary">Simple</span>,<br />
              Flavors Extraordinary.
            </h1>

            {/* Description Text */}
            <p className="text-base text-muted-foreground sm:text-lg leading-relaxed">
              Join a vibrant global community of food lovers. Explore thousands
              of delicious, curated recipes with step-by-step guidance to master
              your kitchen.
            </p>

            {/* CTA Button  */}
            <div className="w-full sm:max-w-md pt-2">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                <Link
                  href="/recipes"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/95 transition-all active:scale-95"
                >
                  Browse Recipes
                </Link>
                <Link
                  href="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border bg-background px-6 py-3 text-sm font-medium hover:bg-accent transition-all active:scale-95"
                >
                  Create Free Account
                </Link>
              </div>
            </div>

            {/* Quick Action Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 pt-2">
              <span className="text-xs font-medium text-muted-foreground">
                Popular:
              </span>
              <Link
                href="/recipes?query=biryani"
                className="text-xs bg-muted hover:bg-primary/10 hover:text-primary px-2.5 py-1 rounded-md transition-colors"
              >
                Biryani
              </Link>
              <Link
                href="/recipes?query=dessert"
                className="text-xs bg-muted hover:bg-primary/10 hover:text-primary px-2.5 py-1 rounded-md transition-colors"
              >
                Desserts
              </Link>
              <Link
                href="/premium"
                className="text-xs text-primary font-medium inline-flex items-center gap-0.5 hover:underline"
              >
                Explore Pro Plans <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}

          <div className="hidden lg:flex relative justify-center items-center h-100">
            {/* Background Decorative Blob Frame */}
            <div className="absolute w-72 h-72 rounded-full bg-linear-to-tr from-orange-500/20 to-red-500/20 blur-2xl animate-pulse" />

            {/* Main Interactive Floating Display Card */}
            <div className="relative w-80 rounded-2xl border bg-background p-5 shadow-xl -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 z-20">
              <div className="h-44 w-full rounded-xl bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-black text-2xl shadow-inner relative overflow-hidden">
                <span className="opacity-10 absolute text-8xl -right-2.5 -bottom-6.25">
                  🍳
                </span>
                Master Class Recipes
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-primary" /> Trending Now
                  </span>
                  <div className="flex items-center text-amber-500 gap-0.5 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> 4.9
                  </div>
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  Creamy Garlic Butter Salmon
                </h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 25 mins
                  </span>
                  <span>•</span>
                  <span>Easy Prep</span>
                </div>
              </div>
            </div>

            {/* Secondary Overlapping Backdrop Card */}
            <div className="absolute w-72 rounded-2xl border bg-muted/60 p-4 shadow-md rotate-6 translate-x-12 translate-y-6 z-10 opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                  🍰
                </div>
                <div className="space-y-1 flex-1">
                  <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-32 bg-foreground/10 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
