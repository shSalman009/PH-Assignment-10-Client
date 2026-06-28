"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Check, Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteRecipeAction } from "@/lib/actions/recipes";
import { dismissReportAction } from "@/lib/actions/report";

export function ReportActionCell({ reportId, recipeId }) {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isDismissPending, startDismissTransition] = useTransition();

  const handleRemoveRecipe = () => {
    startDeleteTransition(async () => {
      const result = await deleteRecipeAction(recipeId, reportId);
      if (result.success) {
        toast.success("Recipe removed successfully.");
      } else {
        toast.error(result.message || "Failed to remove recipe.");
      }
    });
  };

  const handleDismissReport = () => {
    startDismissTransition(async () => {
      const result = await dismissReportAction(reportId);
      if (result.success) {
        toast.success("Report dismissed.");
      } else {
        toast.error(result.message || "Failed to dismiss report.");
      }
    });
  };

  return (
    <TooltipProvider>
      <div className="flex justify-end items-center gap-2">
        {/* Remove Recipe */}
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="icon"
                  disabled={isDeletePending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>

            <TooltipContent>Remove Recipe</TooltipContent>
          </Tooltip>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove this recipe?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. The recipe will be permanently
                removed from the platform.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                onClick={handleRemoveRecipe}
                disabled={isDeletePending}
                className="bg-destructive text-white hover:bg-destructive/90"
              >
                {isDeletePending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Removing...
                  </>
                ) : (
                  "Remove"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Dismiss Report */}
        <AlertDialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={isDismissPending}
                >
                  <Check className="h-4 w-4 text-green-600" />
                </Button>
              </AlertDialogTrigger>
            </TooltipTrigger>

            <TooltipContent>Dismiss Report</TooltipContent>
          </Tooltip>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Dismiss this report?</AlertDialogTitle>

              <AlertDialogDescription>
                The report will be marked as resolved and the recipe will remain
                published.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDismissReport}
                disabled={isDismissPending}
              >
                {isDismissPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Dismissing...
                  </>
                ) : (
                  "Dismiss"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}
