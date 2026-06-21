"use server";

import { serverMutation } from "../core/server";

export async function createRecipeAction(recipePayload) {
  const result = await serverMutation("/recipes", {
    method: "POST",
    body: JSON.stringify(recipePayload),
  });

  return result;
}
