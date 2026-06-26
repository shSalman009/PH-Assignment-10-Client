import React from "react";
import { CreditCard, LogIn, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PurchaseButton({
  recipeId,
  price,
  isLoggedIn,
  isPurchased,
}) {
  if (isPurchased) {
    return (
      <div className="w-full space-y-3">
        <div className="w-full h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm flex items-center justify-center gap-2">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          Recipe Unlocked
        </div>
        <p className="text-xs text-center text-zinc-500">
          You have full lifetime access to this premium guide.
        </p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Link
        href={`/login?redirect=/recipes/${recipeId}`}
        className="w-full h-11 cursor-pointer rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogIn className="h-4 w-4" />
        Log In to Unlock Guide
      </Link>
    );
  }

  return (
    <form action="/api/checkout_sessions" method="POST">
      <input type="hidden" name="recipeId" value={recipeId} />
      <input type="hidden" name="purchaseType" value="recipe" />

      <section>
        <button
          type="submit"
          className="w-full h-11 cursor-pointer rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CreditCard className="h-4 w-4" />
          Unlock Recipe Guide
        </button>
      </section>
    </form>
  );
}
