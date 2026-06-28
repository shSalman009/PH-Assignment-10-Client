"use client";

import React, { useState } from "react";
import { AlertTriangle, Bookmark, Heart } from "lucide-react";
import toast from "react-hot-toast";

import { toggleRecipeLikeAction } from "@/lib/actions/recipes";
import { toggleFavoriteAction } from "@/lib/actions/favorite";
import { addReportAction } from "@/lib/actions/report";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RecipeActionsRow({
  recipeId,
  initialLikes,
  isLoggedIn,
  initialIsLiked,
  isFavorite,
  userEmail,
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isFavorited, setIsFavorited] = useState(isFavorite);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const handleLikeToggle = async () => {
    const nextState = !isLiked;

    // Optimistic update
    setLikes((prev) => (nextState ? prev + 1 : prev - 1));
    setIsLiked(nextState);

    await toggleRecipeLikeAction(recipeId, isLiked);

    toast.success(
      nextState ? "Added to your likes" : "Removed from your likes",
    );
  };

  const handleFavoriteToggle = async () => {
    setIsFavorited(!isFavorited);

    toast.success(
      !isFavorited
        ? "Recipe added to favorites"
        : "Recipe removed from favorites",
    );

    await toggleFavoriteAction(recipeId);
  };

  const handleReportSubmit = async () => {
    if (!reportReason) return;

    const payload = {
      recipeId,
      reporterEmail: userEmail,
      reason: reportReason,
    };

    const res = await addReportAction(payload);

    if (res.success && res.data.insertedId) {
      toast.success("Report submitted for administrator review");
      setReportReason("");
      setIsReportModalOpen(false);
      return;
    }

    toast.error("Failed to submit report. Please try again.");
  };

  return (
    <div className="flex items-center gap-2">
      {/* Like */}
      <Button
        variant={isLiked ? "destructive" : "outline"}
        size="sm"
        className="gap-1.5"
        onClick={handleLikeToggle}
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        <span>
          {likes} {likes === 1 ? "Like" : "Likes"}
        </span>
      </Button>

      {/* Favorite */}
      <Button
        variant={isFavorited ? "secondary" : "outline"}
        size="icon"
        onClick={handleFavoriteToggle}
      >
        <Bookmark className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
      </Button>

      {/* Report */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="hover:text-destructive"
          >
            <AlertTriangle className="h-4 w-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Recipe</DialogTitle>

            <DialogDescription>
              Select the reason for reporting this recipe. Your report will be
              reviewed by an administrator.
            </DialogDescription>
          </DialogHeader>

          <RadioGroup
            value={reportReason}
            onValueChange={setReportReason}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Spam" id="spam" />
              <Label htmlFor="spam">Spam</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Offensive Content" id="offensive" />
              <Label htmlFor="offensive">Offensive Content</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Copyright Issue" id="copyright" />
              <Label htmlFor="copyright">Copyright Issue</Label>
            </div>
          </RadioGroup>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsReportModalOpen(false);
                setReportReason("");
              }}
            >
              Cancel
            </Button>

            <Button onClick={handleReportSubmit} disabled={!reportReason}>
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
