import React from "react";
import { CreditCard } from "lucide-react";

export default function PurchaseButton({ recipeId, price }) {
  return (
    <form action="/api/checkout_sessions" method="POST">
      <input type="hidden" name="recipeId" value={recipeId} />

      <section>
        <button
          type="submit"
          role="link"
          className="w-full h-11 cursor-pointer rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CreditCard className="h-4 w-4" />
          Unlock Recipe Guide
        </button>
      </section>
    </form>
  );
}
