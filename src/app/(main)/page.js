import Banner from "@/components/home/Banner";
import FeaturedRecipes from "@/components/home/FeaturedRecipes";
import PopularRecipes from "@/components/home/PopularRecipes";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <FeaturedRecipes />
      <PopularRecipes />
    </div>
  );
}
