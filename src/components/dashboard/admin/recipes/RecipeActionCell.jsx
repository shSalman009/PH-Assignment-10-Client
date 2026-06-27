"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2, Pencil, Star, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteRecipeAction, updateRecipeAction } from "@/lib/actions/recipes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function RecipeActionCell({ recipeId, isFeatured }) {
  const [featured, setFeatured] = useState(isFeatured);
  const [isFeaturePending, startFeatureTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const handleFeatureToggle = () => {
    startFeatureTransition(async () => {
      const result = await updateRecipeAction(recipeId, {
        isFeatured: !isFeatured,
      });
      if (result.success) {
        setFeatured(!featured);
        toast.success(
          featured
            ? "Recipe removed from featured."
            : "Recipe added to featured.",
        );
      } else {
        toast.error("Failed to update recipe.");
      }
    });
  };

  const handleDelete = () => {
    startDeleteTransition(async () => {
      const result = await deleteRecipeAction(recipeId);
      if (result.success) {
        toast.success("Recipe deleted.");
      } else {
        toast.error("Failed to delete recipe.");
      }
    });
  };

  return (
    <TooltipProvider>
      <div className="flex justify-end items-center gap-2">
        {/* Feature */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={featured ? "default" : "outline"}
              size="icon"
              onClick={handleFeatureToggle}
              disabled={isFeaturePending}
            >
              {isFeaturePending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Star className={`h-4 w-4 ${featured ? "fill-current" : ""}`} />
              )}
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            {featured ? "Remove from Featured" : "Feature Recipe"}
          </TooltipContent>
        </Tooltip>

        {/* Edit */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" asChild>
              <Link href={`/dashboard/my-recipes/edit/${recipeId}`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>

          <TooltipContent>Edit Recipe</TooltipContent>
        </Tooltip>

        {/* Delete */}
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  disabled={isDeletePending}
                >
                  {isDeletePending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>

            <TooltipContent>Delete Recipe</TooltipContent>
          </Tooltip>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete recipe?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. The recipe will be permanently
                deleted from the platform.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeletePending}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                {isDeletePending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}
