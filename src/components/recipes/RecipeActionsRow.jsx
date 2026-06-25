"use client";

import React, { useState } from "react";
import { Heart, Bookmark, AlertTriangle, X } from "lucide-react";
import toast from "react-hot-toast";
import { toggleRecipeLikeAction } from "@/lib/actions/recipes";
import { toggleFavoriteAction } from "@/lib/actions/favorite";
import { addReportAction } from "@/lib/actions/report";

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
    const nextState = !initialIsLiked;

    // Optimistic UI Update
    setLikes((prev) => (nextState ? prev + 1 : prev - 1));
    setIsLiked(!isLiked);

    await toggleRecipeLikeAction(recipeId, initialIsLiked);

    toast.success(
      nextState ? "Added to your likes" : "Removed from your likes",
    );
  };

  const handleFavoriteToggle = async () => {
    setIsFavorited(!isFavorited);
    toast.success(
      !isFavorited ? "Recipe added to favorite" : "Favorite retracted",
    );
    const res = await toggleFavoriteAction(recipeId);
    console.log(res);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return;

    const payload = {
      recipeId,
      reporterEmail: userEmail,
      reason: reportReason,
    };
    const res = await addReportAction(payload);
    if (res.success && res.data.insertedId) {
      toast.success("Report submitted for administrator review");
      setIsReportModalOpen(false);
      setReportReason("");
      return;
    }
    toast.error("Report can not be submitted. Please try again");
  };

  return (
    <div className="flex items-center gap-2">
      {/* Like Coun */}
      <button
        onClick={handleLikeToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
          isLiked
            ? "bg-red-50 text-red-600 border-red-100"
            : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
        }`}
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        <span>
          {likes} {likes === 1 ? "like" : "likes"}
        </span>
      </button>

      {/* Favorite Toggle Button */}
      <button
        onClick={handleFavoriteToggle}
        className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-all ${
          isFavorited
            ? "bg-amber-50 text-amber-600 border-amber-200 shadow-xs"
            : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50"
        }`}
        title="Bookmark Formula"
      >
        <Bookmark className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
      </button>

      {/* Report Button */}
      <button
        onClick={() => setIsReportModalOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all"
        title="Report Content Error"
      >
        <AlertTriangle className="h-4 w-4" />
      </button>

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-2xl border border-zinc-100 shadow-xl p-5 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-500" /> Report
                Recipe Issue
              </h3>
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500">
                  Provide details for flag escalation
                </label>
                <textarea
                  required
                  rows={4}
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  placeholder="Describe the issue (e.g., incorrect instructions, explicit content, missing steps)..."
                  className="w-full text-sm p-3 rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:ring-1 focus:ring-zinc-900 bg-white shadow-inner resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 text-xs font-semibold pt-1">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-3 py-2 border rounded-xl text-zinc-500 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
