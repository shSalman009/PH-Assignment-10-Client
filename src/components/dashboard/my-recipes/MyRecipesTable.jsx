"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, Loader2, UtensilsCrossed } from "lucide-react";
import toast from "react-hot-toast";

import { deleteRecipeAction } from "@/lib/actions/recipes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export default function MyRecipesTable({ initialRecipes = [] }) {
  const router = useRouter();

  const [deleteId, setDeleteId] = useState(null);

  // Loading States
  const [isDeleting, setIsDeleting] = useState(false);

  // DELETE HANDLER
  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const toastId = toast.loading("Deleting recipe from registry...");

    try {
      const res = await deleteRecipeAction(deleteId);
      if (!res.success) throw new Error(res.error);

      toast.success("Recipe successfully deleted.", { id: toastId });
      setDeleteId(null);
      router.refresh();
    } catch (error) {
      toast.error(error.message, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  // EMPTY STATE
  if (initialRecipes.length === 0) {
    return (
      <div className="flex flex-col rounded-xl items-center justify-center border border-dashed p-12 text-center bg-muted/10 min-h-100">
        <div className="bg-muted p-4 rounded-full mb-4">
          <UtensilsCrossed className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">
          No recipes logged yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
          Your catalog data matrix is currently unpopulated.
        </p>
        <Button asChild className="shadow-sm">
          <Link href="/dashboard/add-recipe">Add Your First Recipe</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-29">Image</TableHead>
            <TableHead>Recipe Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Prep Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialRecipes.map((recipe) => (
            <TableRow key={recipe._id}>
              <TableCell>
                <div className="h-10 w-10 rounded-md overflow-hidden bg-muted border">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{recipe.name}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="font-medium text-xs">
                  {recipe.category}
                </Badge>
              </TableCell>
              <TableCell>{recipe.difficultyLevel}</TableCell>
              <TableCell className="text-muted-foreground">
                {recipe.cuisineType}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {recipe.preparationTime} mins
              </TableCell>

              {/* ACTION BUTTONS */}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    asChild
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                  >
                    <Link
                      href={`/dashboard/my-recipes/${recipe._id}`}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-blue-500"
                  >
                    <Link
                      href={`/dashboard/my-recipes/edit/${recipe._id}`}
                      title="Edit Full Recipe"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => setDeleteId(recipe._id)}
                    title="Delete Recipe"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DELETE CONFIRMATION MODAL */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              recipe from your catalog and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              Yes, Delete Recipe
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
