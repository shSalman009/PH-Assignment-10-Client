"use client";

import React, { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { toggleFavoriteAction } from "@/lib/actions/favorite";
import toast from "react-hot-toast";

export default function RemoveFavoriteButton({ recipeId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRemove = async () => {
    startTransition(async () => {
      const result = await toggleFavoriteAction(recipeId, true);

      if (result.success) {
        toast.success("Recipe removed from favorite");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to remove recipe from favorites.");
      }
    });
  };

  return (
    <AlertDialog>
      {/* Trigger Button opens the modal */}
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isPending}
          className="rounded-lg h-10 border-zinc-200 hover:bg-destructive hover:text-destructive-foreground transition-all gap-1.5 font-bold text-xs text-zinc-500"
          title="Remove from favorite collection"
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
          {isPending ? "Removing..." : "Remove"}
        </Button>
      </AlertDialogTrigger>

      {/* Confirmation Modal */}
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-black text-zinc-900 tracking-tight">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-500 text-xs leading-relaxed">
            This will clear the item from your favorite collection. You can
            always re-favorite it later from the marketplace.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 mt-4">
          <AlertDialogCancel className="font-bold text-xs h-10 border-zinc-200 text-zinc-500">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemove}
            className="font-bold text-xs h-10 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Confirm & Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
